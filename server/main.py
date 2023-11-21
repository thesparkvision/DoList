import logging
from fastapi import FastAPI, status
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
from fastapi.middleware.cors import CORSMiddleware
from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.misc.settings import app_settings
from app.db.sql.config import SessionLocal
from app.api.v1 import v1_router
from app.misc.logger import logger

allowed_origins = app_settings.allowed_origins.split(",")

app = FastAPI(title=app_settings.app_name)
app.add_middleware(HTTPSRedirectMiddleware)
if allowed_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(v1_router, prefix="/api/v1", tags=["v1"])


@app.get(
    "/info",
    description="API to retrieve public information for the server",
    status_code=status.HTTP_200_OK,
)
def info() -> None:
    """
    API to retrieve public information for the server to check its working.
    """

    return {"app_name": app_settings.app_name}


@retry(
    stop=stop_after_attempt(app_settings.app_init_waiting_time),
    wait=wait_fixed(app_settings.app_init_wait_intervals),
    before=before_log(logger, logging.INFO),
    after=after_log(logger, logging.WARN),
)
def init() -> None:
    """
    Function to check for database connectivity during app start.
    """

    try:
        db: Session = SessionLocal()
        db.execute(text("SELECT 1"))
    except Exception as e:
        logger.error(e)
        raise e


def main() -> None:
    """
    Runs required actions during app start
    """

    logger.info("Initializing Service")
    init()
    logger.info("Service finished initializing")


main()
