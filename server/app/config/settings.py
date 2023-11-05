from pydantic_settings import BaseSettings
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv(".env"))

class Settings(BaseSettings):
    app_name: str = "DoList API"
    allowed_origins: str = ""


app_settings = Settings()