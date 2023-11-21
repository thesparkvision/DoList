from pydantic_settings import BaseSettings
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv(".env"))


class Settings(BaseSettings):
    app_name: str = "DoList API"
    app_init_waiting_time: int = 60 * 5
    app_init_wait_intervals: int = 1
    allowed_origins: str = ""
    secret_key: str = ""
    jwt_hashing_algorithm: str = ""
    access_token_expire_minutes: int = 3600
    password_hashing_scheme: str = ""
    sql_db_uri: str = ""


app_settings = Settings()
