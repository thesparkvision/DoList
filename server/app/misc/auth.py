from jose import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from app.misc.settings import app_settings

pwd_context = CryptContext(
    schemes=app_settings.password_hashing_scheme, 
    deprecated="auto"
)

def verify_password(plain_password: str, hashed_password) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(plain_password: str) -> str:
    return pwd_context.hash(plain_password)

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, 
        app_settings.secret_key, 
        algorithm=app_settings.jwt_hashing_algorithm
    )
    
    return expire, encoded_jwt