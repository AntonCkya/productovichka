from fastapi import APIRouter, Query, Depends, HTTPException

from sqlalchemy import delete
from sqlalchemy.ext.asyncio import AsyncSession

from typing import Optional
import uuid

import numpy as np
from sqlalchemy.future import select

from client import send_message_to_kafka, listen_to_kafka
from session import get_session
from models import Product, ProductInputModel

api_router = APIRouter(tags=["v3"])

@api_router.post("/api/v3/add")
async def add_product(
    product: ProductInputModel,
    session: AsyncSession = Depends(get_session)
):
    id = str(uuid.uuid4())
    await send_message_to_kafka(product.name, id, real=True)
    embedding = await listen_to_kafka(id)
    product_for_db = Product(
        name = product.name,
        description = product.description,
        price = product.price,
        type = product.type,
        embedding = str(embedding)
    )
    session.add(product_for_db)
    try:
        await session.commit()
        await session.refresh(product_for_db)
        return {
            "message": "OK"
        }
    except Exception as _:
        await session.rollback()
        raise HTTPException(status_code=400, detail="what?")

@api_router.delete("/api/v3/delete/{product_id}")
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
        return {"message": "OK"}
    except Exception as _:
        await session.rollback()
        raise HTTPException(status_code=400, detail="what?")

@api_router.get("/api/v3/product")
async def get_products(
    query: Optional[str] = Query(default=None),
    limit: Optional[int] = None,
    offset: Optional[int] = None,
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(select(Product))
    products = result.scalars().all()

    if not query:
        query = ""
    if not offset:
        offset = 0

    id = str(uuid.uuid4())
    await send_message_to_kafka(query, id, real=True)
    query_embedding = await listen_to_kafka(id)
    query_result = []

    for product in products:
        product_embedding = np.array(eval(product.embedding))
        distance = np.dot(product_embedding, query_embedding) / (
            np.linalg.norm(product_embedding) * np.linalg.norm(query_embedding)
        )
        query_result.append({
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "type": product.type,
            "score": float(distance)
        })

    query_result.sort(key=lambda x: x["score"], reverse=True)
    if not limit:
        return query_result[offset:]
    else:
        return query_result[offset:limit+offset]
