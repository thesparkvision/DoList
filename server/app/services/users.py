from sqlalchemy.orm import Session
from datetime import timedelta

from app.schemas import users as user_schema
from app.db.sql import data as sql_db
from app.db.sql.models import User, UserToken, TokenTypeEnum
from app.misc import exceptions
from app.misc.settings import app_settings
from app.misc import auth


def register_user(
    mysql_session: Session, user_detail: user_schema.UserRegisterSchema
) -> None:
    """
    Service method to check for existence of user.
    If user doesn't exist, then it register the user in system
    """

    existing_user: User = sql_db.get_user_by_email(mysql_session, user_detail.email)
    if existing_user:
        raise exceptions.RecordAlreadyExist

    new_user = User(**user_detail.dict())
    new_user.password = auth.get_password_hash(new_user.password)

    user_id: int = sql_db.add_user(mysql_session, new_user)

    if not user_id:
        raise exceptions.SomethingWentWrong


def login_user(
    mysql_session: Session, user_detail: user_schema.UserLoginSchema
) -> user_schema.TokenSchema:
    """
    Service method for user login.
    If user exist, it creates authentication token to return to user for further API calls.
    """

    is_invalid = False

    fetched_user: User = sql_db.get_user_by_email(mysql_session, user_detail.email)
    if not fetched_user:
        is_invalid = True

    if fetched_user and not auth.verify_password(
        plain_password=user_detail.password, hashed_password=fetched_user.password
    ):
        is_invalid = True

    if is_invalid or not fetched_user.is_active:
        raise exceptions.NotAuthorized(detail="Invalid Username or password")

    data = {"id": fetched_user.id}
    expiry_date, access_token = auth.create_access_token(
        data=data,
        expires_delta=timedelta(minutes=app_settings.access_token_expire_minutes),
    )

    user_token_object = UserToken(
        token=access_token,
        expiry_date=expiry_date,
        token_type=TokenTypeEnum.AUTHENTICATION,
        user_id=fetched_user.id,
    )
    access_token_id: int = sql_db.add_user_token(mysql_session, user_token_object)

    if not access_token_id:
        raise exceptions.SomethingWentWrong

    return {"access_token": access_token, "token_type": "bearer"}
