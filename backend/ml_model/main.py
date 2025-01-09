import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel

from fastapi import FastAPI, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run
import asyncio
import logging

from aiokafka import AIOKafkaProducer, AIOKafkaConsumer
import json

from random import uniform

def model_init():
    tokenizer = AutoTokenizer.from_pretrained("DeepPavlov/rubert-base-cased-sentence", model_max_length=512)
    model = AutoModel.from_pretrained("DeepPavlov/rubert-base-cased-sentence")
    return model, tokenizer

def embed_bert_cls(text, model, tokenizer):
    t = tokenizer(text, padding=True, truncation=True, return_tensors='pt')

    with torch.no_grad():
        model_output = model(**{k: v.to(model.device) for k, v in t.items()})

    embeddings = model_output.last_hidden_state[:, 0, :]
    embeddings = torch.nn.functional.normalize(embeddings)

    return embeddings[0].cpu().numpy().tolist()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

async def consume_and_respond():
    consumer = AIOKafkaConsumer(
        "embedding_requests",
        bootstrap_servers="kafka:29092",
        group_id="embedding_group"
    )
    producer = AIOKafkaProducer(bootstrap_servers="kafka:29092")
    logger.info(f"start app")
    await consumer.start()
    await producer.start()
    try:
        async for msg in consumer:
            logger.info(f"new msg {msg}")
            message = json.loads(msg.value.decode("utf-8"))
            query = message["query"]
            request_id = message["id"]
            is_real = message["real"]

            embedding = []
            if is_real:
                model, tokenizer = model_init()
                embedding = embed_bert_cls(query, model, tokenizer)
            else:
                len_res = 768
                for _ in range(len_res):
                    embedding.append(uniform(-1, 1))

            response = {
                "id": request_id,
                "embedding": embedding
            }
            logger.info(f"Processed request {request_id}")
            await producer.send_and_wait(
                "embedding_responses",
                json.dumps(response).encode("utf-8")
            )
    finally:
        await consumer.stop()
        await producer.stop()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/embedding")
async def get_embedding(query: str = Query(), mt = Depends(model_init)):
    model, tokenizer = mt[0], mt[1]
    return {
        "embedding": embed_bert_cls(query, model, tokenizer)
    }

@app.get("/embedding_bootleg")
async def get_embedding_bootleg(query: str = Query()):
    len_res = 768
    res = []
    for _ in range(len_res):
        res.append(uniform(-1, 1))
    return {
        "embedding": res
    }

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(consume_and_respond())

if __name__ == "__main__":
    run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="debug",
        timeout_keep_alive=60
    )
