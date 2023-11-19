from sqlalchemy.orm import Session

from app.schemas import users as user_schema
from app.db.sql import data as sql_db
from app.db.sql import models
from app.misc import exceptions
from app.misc.logger import logger

def register_user(mysql_session: Session, user_detail: user_schema.UserRegisterSchema):
    existing_user = sql_db.get_user_by_email(mysql_session, user_detail.email)
    if existing_user:
        raise exceptions.RecordAlreadyExist
    
    new_user = models.User(**user_detail.dict())
    user_id = sql_db.add_user(mysql_session, new_user)

    if not user_id:
        raise exceptions.SomethingWentWrong

def login_user():
    pass

def get_user(mysql_session: Session, user_id: int):
    user = sql_db.get_user_by_id(mysql_session, user_id)
    if not user:
        raise exceptions.RecordDoesNotExist

    if not user.is_active:
        raise exceptions.RecordIsInactive
    
    return user