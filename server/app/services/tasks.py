from sqlalchemy.orm import Session
from app.schemas import tasks as task_schema
from app.db.sql import data as sql_db
from app.db.sql.models import Task
from app.misc import exceptions

def create_task(
    mysql_session: Session, 
    user_id: int, 
    task_detail: task_schema.TaskRequestSchema
) -> Task:
    """
        Service method for creating a task.
    """

    new_task = Task(
        **task_detail.dict(),
        user_id = user_id
    )
    created_task: Task = sql_db.add_task(mysql_session, new_task)
    return created_task

def get_task(
    mysql_session: Session, 
    user_id: int, 
    task_id: int
) -> Task:
    """
        Service method for retrieving a user task using user and task ids.
    """

    fetched_task: Task = sql_db.get_user_task(mysql_session, task_id, user_id)
    if not fetched_task:
        raise exceptions.RecordDoesNotExist
    return fetched_task

def get_all_tasks(
    mysql_session: Session, 
    user_id: int
) -> list[Task]:
    """"
        Service method for retrieving all tasks related with user.
    """

    fetched_tasks: list[Task] = sql_db.get_all_user_tasks(mysql_session, user_id)
    return fetched_tasks

def update_task(
    mysql_session: Session, 
    user_id: int, 
    task_id: int, 
    task_detail: task_schema.TaskRequestSchema
) -> Task:
    """
        Service method for updating a user task with user provided updates.
    """

    pass

def delete_task(
    mysql_session: Session, 
    user_id: int, 
    task_id: int
) -> None:
    """
        Service method for hard deleting a user task.
    """

    fetched_task: Task = get_task(mysql_session, task_id, user_id)
    sql_db.delete_user_task(mysql_session, fetched_task)