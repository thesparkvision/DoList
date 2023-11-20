from typing import List

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

from app.schemas import tasks as task_schema
from app.services import tasks as task_service
from app.misc import auth, exceptions
from app.misc.logger import logger
from app.db.sql.config import get_db_session

router = APIRouter()


@router.post(
    "/", 
    response_model=task_schema.TaskResponseSchema
)
async def create_task(
    task_detail: task_schema.TaskRequestSchema,
    current_user = Depends(auth.get_current_active_user),
    mysql_session: Session = Depends(get_db_session)
) -> task_schema.TaskResponseSchema:
    try:
        task = task_service.create_task(mysql_session, current_user, task_detail)
        return task
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content = {
                "error": str(e)
            },
            status_code =  status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@router.patch("/{task_id}", response_model=task_schema.TaskResponseSchema)
async def update_task(
    task_id: str,
    task_detail: task_schema.TaskRequestSchema
) -> task_schema.TaskResponseSchema:
    return task_service.update_task(task_id, task_detail)

@router.get(
    "/{task_id}", 
    response_model=task_schema.TaskResponseSchema)
async def get_task(
    task_id: int,
    current_user = Depends(auth.get_current_active_user),
    mysql_session: Session = Depends(get_db_session)
) -> task_schema.TaskResponseSchema:
    try:
        return task_service.get_task(mysql_session, current_user.id, task_id)
    except exceptions.RecordDoesNotExist as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content = {
                "error": str(e)
            },
            status_code =  status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@router.get(
    "/", 
    response_model=list[task_schema.TaskResponseSchema]
)
async def get_all_tasks(
    current_user = Depends(auth.get_current_active_user),
    mysql_session: Session = Depends(get_db_session)
) -> list[task_schema.TaskResponseSchema]:
    return task_service.get_all_tasks(mysql_session, current_user.id)