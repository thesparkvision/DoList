from sqlalchemy.orm import Session
from fastapi import Depends

from app.db.sql.models import User, UserToken

def get_user_by_id(
    session: Session,
    user_id: int
) -> [User, None]:
    """
        returns user object by identifying it by id
    """ 
    user = session.query(User).filter(User.id == user_id).first()
    return user

def get_user_by_email(
    session: Session,
    email: str
) -> [User, None]:
    """
        returns user object by identifying it by email address
    """
    user = session.query(User).filter(User.email == email).first()
    return user

def add_user(
    session: Session,
    new_user: User
) -> [int, None]:
    """
        adds a new user to the user table and returns the id if inserted successfully
    """
    session.add(new_user)
    session.commit()
    return new_user.id

def add_user_token(
    session: Session,
    new_user_token: UserToken
) -> None:
    """
        adds a new user token to the user token table and returns the id if inserted successfully
    """
    session.add(new_user_token)
    session.commit()
    return new_user_token.id