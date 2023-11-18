from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse
from fastapi import status

from app.schemas import users as user_schema
from app.services import users as user_service
from app.misc import exceptions
from app.misc.logger import logger
from app.db.sql.config import get_db_session

router = APIRouter()


@router.post("/register", response_model=user_schema.UserSchema)
async def register_user(
    user_detail: user_schema.UserRegisterSchema,
    mysql_session: Session = Depends(get_db_session)
) -> user_schema.UserSchema:
    try:
        user_service.register_user(mysql_session, user_detail)
        return JSONResponse(
            content = {},
            status_code=status.HTTP_201_CREATED
        )
    except exceptions.RecordAlreadyExist as e:
        return JSONResponse(
            content = {
                "error": str(e)
            },
            status_code = status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content = {
                "error": "Unexpected Error in registering the user"
            },
            status_code =  status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@router.post("/login", response_model=user_schema.UserSchema)
async def login_user(
    user_detail: user_schema.UserLoginSchema
) -> user_schema.UserSchema:
    return user_service.login_user(user_detail)

@router.post("/{user_id}", response_model=user_schema.UserSchema)
async def get_user(
    user_id: str
) -> user_schema.UserSchema:
    return user_service.get_user(user_id)