import aiohttp
import asyncio
from aiokafka import AIOKafkaProducer, AIOKafkaConsumer
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def get_embedding(query: str, real: bool = True):
    async with aiohttp.ClientSession() as session:
        url = 'http://ml-service:8001/'
        if real:
            url = url + f'embedding?query={query}'
        else:
            url = url + f'embedding_bootleg?query={query}'
        async with session.get(url) as resp:
            data = await resp.json()
            return data['embedding']


async def kafka_sendler(query: str, id: str, real: bool = True):
    producer = AIOKafkaProducer(bootstrap_servers='kafka-service:29092')
    await producer.start()
    topic = "embedding_requests"
    message = {
        "id": id,
        "query": query,
        "real": real
    }
    try:
        await producer.send_and_wait(topic, json.dumps(message).encode('utf-8'))
    finally:
        await producer.stop()

async def send_message_to_kafka(query: str, id: str, real: bool = True):
    await kafka_sendler(query, id, real)

async def listen_to_kafka(id: str):
    logger.info(f"start listening")
    consumer = AIOKafkaConsumer(
        "embedding_responses",
        bootstrap_servers="kafka-service:29092",
        group_id="filter_group",
        auto_offset_reset="earliest", #хз мб поможет
        enable_auto_commit=True
    )
    await consumer.start()
    logger.info("consumer started id = %s", id)
    try:
        async for msg in consumer:
            message = json.loads(msg.value.decode("utf-8"))
            logger.info("message read = %s", message["id"])
            if message["id"] == id:
                logger.info("message finded = %s", id)
                return message["embedding"]
    finally:
        logger.info(f"consumer stopped")
        await consumer.stop()


async def listen_to_kafka(id: str, origMSG: str, id_topic: int):
    logger.info(f"start listening")
    sttr = f"filter_group_{id_topic}"
    consumer = AIOKafkaConsumer(
        "embedding_responses",
        bootstrap_servers="kafka-service:29092",
        group_id=sttr,
        auto_offset_reset="earliest", #хз мб поможет
        enable_auto_commit=True
    )
    await consumer.start()
    logger.info(f"consumer started id = {id} , {origMSG}")

    try:
        async for msg in consumer:
            message = json.loads(msg.value.decode("utf-8"))
            logger.info(f"message read = {message["id"]}, {origMSG}")
            if message["id"] == id:
                logger.info("message finded = %s", id)
                return message["embedding"]
    finally:
        logger.info(f"consumer stopped")
        await consumer.stop()