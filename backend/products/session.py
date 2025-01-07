from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker

class SessionManager:
    DATABASE_URL: str
    engine = None  # Статический атрибут для движка

    def __init__(self) -> None:
        self.db_host = "localhost"
        self.db_port = "5432"
        self.db_user = "admin"
        self.db_password = "aboba"
        self.db_name = "mydb"

        self.DATABASE_URL = f"postgresql+asyncpg://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"
        if not SessionManager.engine:
            self.refresh()

    def __new__(cls):
        if not hasattr(cls, "instance"):
            cls.instance = super(SessionManager, cls).__new__(cls)
        return cls.instance

    def get_session_maker(self) -> sessionmaker:
        return sessionmaker(self.engine, class_=AsyncSession, expire_on_commit=False)

    def refresh(self) -> None:
        SessionManager.engine = create_async_engine(self.DATABASE_URL, echo=True, future=True)


async def get_session() -> AsyncSession:
    session_maker = SessionManager().get_session_maker()
    async with session_maker() as session:
        yield session
