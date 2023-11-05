from fastapi import FastAPI
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi.middleware.cors import CORSMiddleware

from app.config.settings import app_settings
from app.api.v1 import v1_router

allowed_origins = app_settings.allowed_origins.split(",")

app = FastAPI()
app.add_middleware(HTTPSRedirectMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(v1_router, prefix="/v1", tags=["v1"])

@app.get("/info")
async def info():
    return {
        "app_name": app_settings.app_name
    }