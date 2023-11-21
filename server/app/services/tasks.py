from sqlalchemy.orm import Session
from app.schemas import tasks as task_schema
from app.db.sql import data as sql_db
from app.db.sql import models
from app.misc import exceptions

def create_task(mysql_session: Session, user: models.User, task_detail: task_schema.TaskRequestSchema):
    new_task = models.Task(
        **task_detail.dict(),
        user_id = user.id
    )
    created_task = sql_db.add_task(mysql_session, new_task)
    return created_task

def get_task(mysql_session: Session, user_id: int, task_id: int):
    fetched_task = sql_db.get_user_task(mysql_session, task_id, user_id)
    if not fetched_task:
        raise exceptions.RecordDoesNotExist
    return fetched_task

def get_all_tasks(mysql_session: Session, user_id: int):
    fetched_tasks = sql_db.get_all_user_tasks(mysql_session, user_id)
    return fetched_tasks

def update_task():
    pass

def delete_task(mysql_session: Session, user_id: int, task_id: int):
    fetched_task = get_task(mysql_session, task_id, user_id)
    sql_db.delete_user_task(mysql_session, fetched_task)