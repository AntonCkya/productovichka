from fastapi import FastAPI, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run

from sqlalchemy.ext.asyncio import AsyncSession

from client import get_embedding
from session import get_session
from models import Product, ProductInputModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/add")
async def add_product(
    product: ProductInputModel,
    session: AsyncSession = Depends(get_session)
):
    embedding = await get_embedding(product.name, real=False)
    product_for_db = Product(
        name = product.name,
        description = product.description,
        price = product.price,
        type = product.type,
        embedding = str(embedding)
    )
    session.add(product_for_db)
    await session.commit()
    await session.refresh(product_for_db)
    return {
        "message": "OK"
    }

if __name__ == "__main__":
    run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="debug",
        timeout_keep_alive=60
    )
