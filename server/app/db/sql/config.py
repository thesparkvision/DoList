from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from typing import Generator

from app.config.settings import app_settings

engine = create_engine(app_settings.sql_db_uri)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

def get_db_session() -> Generator:
    try:
        db_session = SessionLocal()
        yield db_session
    finally:
        db_session.close()