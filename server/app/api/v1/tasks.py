from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from typing import Union

from app.schemas import tasks as task_schema
from app.services import tasks as task_service
from app.misc import auth, exceptions
from app.misc.logger import logger
from app.db.sql.config import get_db_session

router = APIRouter()


@router.post(
    "/",
    description="API to create a user task.",
    response_model=task_schema.TaskResponseSchema,
    status_code=status.HTTP_201_CREATED,
)
def create_task(
    task_detail: task_schema.TaskRequestSchema,
    current_user=Depends(auth.get_current_active_user),
    mysql_session: Session = Depends(get_db_session),
) -> task_schema.TaskResponseSchema:
    """ "
    API to create a task under a user.
    """

    try:
        return task_service.create_task(mysql_session, current_user.id, task_detail)
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@router.patch(
    "/{task_id}",
    description="API to update a user task.",
    response_model=task_schema.TaskResponseSchema,
    status_code=status.HTTP_200_OK,
)
def update_task(
    task_id: int,
    task_detail: task_schema.TaskUpdateRequestSchema,
    current_user=Depends(auth.get_current_active_user),
    mysql_session: Session = Depends(get_db_session),
) -> task_schema.TaskResponseSchema:
    """
    API to update a user task by new updated information provided by user.
    """

    try:
        return task_service.update_task(
            mysql_session,
            current_user.id,
            task_id,
            task_detail,
        )
    except exceptions.RecordDoesNotExist as e:
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@router.get(
    "/{task_id}",
    description="API to get a user task.",
    response_model=task_schema.TaskResponseSchema,
    status_code=status.HTTP_200_OK,
)
def get_task(
    task_id: int,
    current_user=Depends(auth.get_current_active_user),
    mysql_session: Session = Depends(get_db_session),
) -> task_schema.TaskResponseSchema:
    """
    API to get a task related with user using task id.
    """

    try:
        return task_service.get_task(mysql_session, current_user.id, task_id)
    except exceptions.RecordDoesNotExist as e:
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@router.get(
    "/",
    description="API to get all tasks related with a user.",
    response_model=list[task_schema.TaskResponseSchema],
    status_code=status.HTTP_200_OK,
)
def get_all_tasks(
    current_user=Depends(auth.get_current_active_user),
    mysql_session: Session = Depends(get_db_session),
) -> Union[list[task_schema.TaskResponseSchema], None]:
    """
    API to get all tasks related with a user if user is authenticated.
    """

    try:
        return task_service.get_all_tasks(mysql_session, current_user.id)
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@router.delete(
    "/{task_id}",
    description="API to delete a user task.",
    response_model=None,
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_task(
    task_id: int,
    current_user=Depends(auth.get_current_active_user),
    mysql_session: Session = Depends(get_db_session),
) -> None:
    """
    API to delete a task related with user.
    """

    try:
        task_service.delete_task(mysql_session, current_user.id, task_id)
    except exceptions.RecordDoesNotExist as e:
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )