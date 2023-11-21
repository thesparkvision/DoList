from sqlalchemy.orm import Session
from fastapi import Depends

from app.db.sql.models import User, UserToken, Task

def get_user_by_id(
    session: Session,
    user_id: int
) -> [User, None]:
    """
        Returns user object by identifying it by id.
    """ 

    return session.query(User).filter(User.id == user_id).first()

def get_user_by_email(
    session: Session,
    email: str
) -> [User, None]:
    """
        Returns user object by identifying it by email address.
    """

    return session.query(User).filter(User.email == email).first()

def add_user(
    session: Session,
    new_user: User
) -> [int, None]:
    """
        Adds a new user to the user table and returns the id if inserted successfully.
    """

    session.add(new_user)
    session.commit()
    return new_user.id

def add_user_token(
    session: Session,
    new_user_token: UserToken
) -> None:
    """
        Adds a new user token to the user token table and returns the id if inserted successfully.
    """

    session.add(new_user_token)
    session.commit()
    return new_user_token.id

def add_task(
    session: Session,
    new_task: Task
) -> Task:
    """
        Adds a new task to task table and assigns it to a user.
    """

    session.add(new_task)
    session.commit()
    return new_task

def get_user_task(
    session: Session,
    task_id: int,
    user_id: int
) -> Task:
    """
        Gets a user task from task table.
    """
    
    return (
        session.query(Task)
        .filter(Task.user_id == user_id, Task.id == task_id)
        .first()
    )

def get_all_user_tasks(
    session: Session,
    user_id: int
) -> list[Task]:
    """
        Gets all user task from task table.
    """

    return (
        session.query(Task)
        .filter(Task.user_id == user_id)
        .all()
    )

def delete_user_task(
    session: Session,
    task_to_delete: Task
) -> None:
    """
        Delete a user task from task table.
    """

    session.delete(task_to_delete)
    session.commit()