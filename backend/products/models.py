from sqlalchemy import Column, Integer, Float, MetaData
from sqlalchemy.dialects.postgresql import TEXT
from sqlalchemy.orm import declarative_base

from pydantic import BaseModel

convention = {
    "all_column_names": lambda constraint, table: "_".join(
        [str(column.name) for column in constraint.columns.values()]
    ),
    "ix": "ix__%(table_name)s__%(all_column_names)s",
    "uq": "uq__%(table_name)s__%(all_column_names)s",
    "ck": "ck__%(table_name)s__%(constraint_name)s",
    "fk": ("fk__%(table_name)s__%(all_column_names)s__" "%(referred_table_name)s"),
    "pk": "pk__%(table_name)s",
}
metadata = MetaData(naming_convention=convention)
DeclarativeBase = declarative_base(metadata=metadata)

class Base(DeclarativeBase):
    __abstract__ = True
    pass

class Product(Base):
    __tablename__ = "products"

    id = Column("id", Integer, primary_key=True, index=True)
    name = Column("name", TEXT, index=True, nullable=False)
    description = Column("description", TEXT, nullable=True)
    price = Column("price", Float, nullable=True)
    type = Column("type", TEXT, nullable=True)
    embedding = Column("embedding", TEXT, nullable=False)


class ProductInputModel(BaseModel):
    name: str
    description: str
    price: float
    type: str
