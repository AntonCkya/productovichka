import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel
tokenizer = AutoTokenizer.from_pretrained("DeepPavlov/rubert-base-cased-sentence", model_max_length=512)
model = AutoModel.from_pretrained("DeepPavlov/rubert-base-cased-sentence")

def embed_bert_cls(text, model, tokenizer):
    t = tokenizer(text, padding=True, truncation=True, return_tensors='pt')
    with torch.no_grad():
        model_output = model(**{k: v.to(model.device) for k, v in t.items()})
    embeddings = model_output.last_hidden_state[:, 0, :]
    embeddings = torch.nn.functional.normalize(embeddings)
    return embeddings[0].cpu().numpy()

datas_lables = [
    "лимоны 2 шт",
    "лимон крупный",
    "лимоны узбекские Navetke",
    "лимонад из лавки",
    "лимон и имбирь",
    "лимонад из лавки мандарин",
    "апельсины сладкие",
    "напиток апельсин-мандарин добрый",
    "сок апельсиновый из лавки",
    "помидоры розовые панамера",
    "помидоры бычье сердце дагестан",
    "томаты pomito резанные мякоть",
    "томаты эко-культура сливовидные красные",
    "слива сезонная",
    "взбитые сливки альпенгурт",
    "масло сливочное экомилк",
    "масло сливочное вологодское",
    "чернослив без косточек",
    "виноград shine muscat",
    "виноград shine muscat без косточки",
    "виноград томсон без косточки",
    "хлеб пшеничный из лавки масло-зелень",
    "хлеб пшеничный из лавки луковый",
    "хлеб мультизерновой из лавки заварной",
    "булочки для хот-догов из лавки",
    "булочки для бургеров из лавки с кунжутом",
    "лаваш армянский тонкий",
    "картофель синеглазка мытый",
    "тыква баттернат",
    "огурцы бакинские азербайджан",
    "авокадо хасс артфрут спелое"
]

datas = []
for i in datas_lables:
    datas.append((i, embed_bert_cls(i, model, tokenizer)))





from fastapi import FastAPI, Query
from uvicorn import run

app = FastAPI()

@app.get("/ping")
def pong(query: str = Query(...),):
    query_result = []
    query_data = embed_bert_cls(query, model, tokenizer)

    for i in datas:
        distance = np.dot(i[1], query_data) / (np.linalg.norm(i[1]) * np.linalg.norm(query_data))
        if distance > 0.7:
            query_result.append((i[0], float(distance)))

    query_result.sort(key=lambda x: x[1], reverse=True)
    return query_result

