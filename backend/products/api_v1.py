from fastapi import APIRouter, Query, Depends, HTTPException

from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession

import numpy as np

from client import get_embedding
from session import get_session
from models import Product, ProductInputModel

api_router = APIRouter(tags=["v1"])

@api_router.post("/api/v1/add")
async def add_product(
    #product: ProductInputModel,
    name: str, 
    description: str, 
    price: float, 
    type: str,
    session: AsyncSession = Depends(get_session)
):
    embedding = await get_embedding(name, real=True)
    product_for_db = Product(
        name = name,
        description = description,
        price = price,
        type = type,
        embedding = str(embedding)
    )
    session.add(product_for_db)
    try:
        await session.commit()
        await session.refresh(product_for_db)
        return {
            "message": "Product added successfully", 
            "product": {"name": name, "description": description, "price": price, "type": type}
        }
    except Exception as _:
        await session.rollback()
        raise HTTPException(status_code=400, detail="what?")

@api_router.delete("/api/v1/delete/{product_id}")
async def delete_product(
    product_id: int,
    session: AsyncSession = Depends(get_session)
):
    delete_query = delete(Product).where(
        Product.id == product_id
    )
    try:
        await session.execute(delete_query)
        await session.commit()
        return {"message": "Product deleted successfully"}
    except Exception as _:
        await session.rollback()
        raise HTTPException(status_code=400, detail="what?")
    
@api_router.get("/api/v1/ping")
async def pong(
    query: str = Query(default=None),
    session: AsyncSession = Depends(get_session)
):
    products = await session.query(Product).all()

    if not query:
        return [{"id": product.id, "name": product.name, "description": product.description, "price": product.price, "type": product.type, "score": 1} for product in products]

    query_embedding = await get_embedding(product.name, real=True)
    query_result = []

    for product in products:
        product_embedding = np.array(eval(product.embedding))
        distance = np.dot(product_embedding, query_embedding) / (
            np.linalg.norm(product_embedding) * np.linalg.norm(query_embedding)
        )
        if distance > 0.7:
            query_result.append({
                "id": product.id,
                "name": product.name,
                "description": product.description,
                "price": product.price,
                "type": product.type,
                "score": float(distance)
            })

    query_result.sort(key=lambda x: x["score"], reverse=True)

    return query_result

@api_router.get("/all")
async def get_all_products(
    session: AsyncSession = Depends(get_session)
):
    products = await session.query(Product).all()
    return [{"id": product.id, "name": product.name, "description": product.description, "price": product.price, "type": product.type, "score": 1} for product in products]
