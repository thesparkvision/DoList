from passlib.context import CryptContext
from app.misc.settings import app_settings
from app.db.sql.data import data

pwd_context = CryptContext(
    schemes=app_settings.password_hashing_scheme, 
    deprecated="auto"
)

def verify_password(plain_password: str, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(plain_password: str) -> str:
    return pwd_context.hash(plain_password)

def authenticate_user(user_id: int, password: str):
    is_invalid = False

    if not verify_password(
        plain_password=password, 
        hashed_password=user.password
    ):
        is_invalid = True

    user = data.get_user_by_id(user_id)
    if not user:
        is_invalid = True

    if is_invalid or not user.is_active:
        raise Exception("Invalid Username or password")

    if not user.is_active:
        raise Exception("The account is inactive or disabled")