import aiohttp
import asyncio

async def get_embedding(query: str, real: bool = True):
    async with aiohttp.ClientSession() as session:
        url = 'http://ml.productovichka-main_app_network:8001/'
        if real:
            url = url + f'embedding?query={query}'
        else:
            url = url + f'embedding_bootleg?query={query}'
        async with session.get(url) as resp:
            data = await resp.json()
            return data['embedding']
