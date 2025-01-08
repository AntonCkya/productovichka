from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run

from api_v1 import api_router as v1_api_router
from api_v2 import api_router as v2_api_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_api_router)
app.include_router(v2_api_router)

if __name__ == "__main__":
    run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="debug",
        timeout_keep_alive=60
    )
