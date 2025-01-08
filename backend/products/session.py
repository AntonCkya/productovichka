from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker

from getenv import get_dotenv_vars

class SessionManager:
    DATABASE_URL: str
    engine = None  # Статический атрибут для движка

    def __init__(self) -> None:
        vars = get_dotenv_vars()
        DB_HOST = vars['DB_HOST']
        DB_PORT = vars['DB_PORT']
        DB_USER = vars['DB_USER']
        DB_PASSWORD = vars['DB_PASSWORD']
        DB_NAME = vars['DB_NAME']

        self.DATABASE_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
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
