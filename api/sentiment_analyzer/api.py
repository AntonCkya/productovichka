import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel
from fastapi import FastAPI, Query, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from sqlalchemy.future import select

tokenizer = AutoTokenizer.from_pretrained("DeepPavlov/rubert-base-cased-sentence", model_max_length=512)
model = AutoModel.from_pretrained("DeepPavlov/rubert-base-cased-sentence")

DATABASE_URL = "sqlite:///./products.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    type = Column(String, nullable=True)
    embedding = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def embed_bert_cls(text, model, tokenizer):
    t = tokenizer(text, padding=True, truncation=True, return_tensors='pt')

    with torch.no_grad():
        model_output = model(**{k: v.to(model.device) for k, v in t.items()})

    embeddings = model_output.last_hidden_state[:, 0, :]
    embeddings = torch.nn.functional.normalize(embeddings)

    return embeddings[0].cpu().numpy().tolist()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def pong(query: str = Query(default=None), db: SessionLocal = Depends(get_db)):
    result = await session.execute(select(Product))
    products = result.scalars().all()

    if not query:
        return [{"id": product.id, "name": product.name, "description": product.description, "price": product.price, "type": product.type, "score": 1} for product in products]

    query_embedding = embed_bert_cls(query, model, tokenizer)
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

@app.get("/all")
def get_all_products(db: SessionLocal = Depends(get_db)):
    result = await session.execute(select(Product))
    products = result.scalars().all()

    return [{"id": product.id, "name": product.name, "description": product.description, "price": product.price, "type": product.type, "score": 1} for product in products]

@app.post("/add")
def add_product(
    name: str, 
    description: str, 
    price: float, 
    type: str, 
    db: SessionLocal = Depends(get_db)
):
    embedding = embed_bert_cls(name, model, tokenizer)
    product = Product(name=name, description=description, price=price, type=type, embedding=str(embedding))
    db.add(product)
    db.commit()
    db.refresh(product)

    return {"message": "Product added successfully", "product": {"name": name, "description": description, "price": price, "type": type}}

@app.delete("/delete/{product_id}")
def delete_product(product_id: int, db: SessionLocal = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()

    return {"message": "Product deleted successfully"}
