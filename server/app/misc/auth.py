from jose import jwt, JWTError
from fastapi import Depends
from typing import Annotated
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from fastapi import HTTPException, status

from app.misc.settings import app_settings
from app.db.sql import data as sql_db
from app.db.sql.config import get_db_session
from app.db.sql.models import User

pwd_context = CryptContext(
    schemes=app_settings.password_hashing_scheme, 
    deprecated="auto"
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

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

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    mysql_session: Session = Depends(get_db_session)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, app_settings.secret_key, algorithms=[app_settings.jwt_hashing_algorithm])
        user_id: str = payload.get("id")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = sql_db.get_user_by_id(mysql_session, user_id=user_id)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user