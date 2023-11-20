from sqlalchemy.orm import Session
from datetime import timedelta

from app.schemas import users as user_schema
from app.db.sql import data as sql_db
from app.db.sql import models
from app.misc import exceptions
from app.misc.logger import logger, app_settings
from app.misc import auth

def register_user(mysql_session: Session, user_detail: user_schema.UserRegisterSchema):
    existing_user = sql_db.get_user_by_email(mysql_session, user_detail.email)
    if existing_user:
        raise exceptions.RecordAlreadyExist
    
    new_user = models.User(**user_detail.dict())
    new_user.password = auth.get_password_hash(new_user.password)

    user_id = sql_db.add_user(mysql_session, new_user)

    if not user_id:
        raise exceptions.SomethingWentWrong

def login_user(mysql_session: Session, user_detail: user_schema.UserLoginSchema):
    is_invalid = False
    
    fetched_user = sql_db.get_user_by_email(mysql_session, user_detail.email)
    if not fetched_user:
        is_invalid = True

    if fetched_user and not auth.verify_password(
        plain_password=user_detail.password, 
        hashed_password=fetched_user.password
    ):
        is_invalid = True

    if is_invalid or not fetched_user.is_active:
        raise Exception("Invalid Username or password")

    data = {"id": fetched_user.id }
    expiry_date, access_token = auth.create_access_token(
        data=data, expires_delta=timedelta(minutes=app_settings.access_token_expire_minutes)
    )

    user_token_object =  models.UserToken(
        token=access_token,
        expiry_date = expiry_date,
        token_type=models.TokenTypeEnum.authentication,
        user_id = fetched_user.id
    )
    access_token_id = sql_db.add_user_token(mysql_session, user_token_object)

    if not access_token_id:
        raise exceptions.SomethingWentWrong

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }