from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

from app.schemas import users as user_schema
from app.services import users as user_service
from app.misc import exceptions, auth
from app.misc.logger import logger
from app.db.sql.config import get_db_session

router = APIRouter()


@router.post(
    "/register",
    description="API to register a new user in system",
    response_model=None,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    user_detail: user_schema.UserRegisterSchema,
    mysql_session: Session = Depends(get_db_session),
) -> None:
    """
    API to register a new user in the database.
    """

    try:
        user_service.register_user(mysql_session, user_detail)
        return JSONResponse(content={}, status_code=status.HTTP_201_CREATED)
    except exceptions.RecordAlreadyExist as e:
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": "Unexpected Error in registering the user"},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@router.post(
    "/login",
    description="API for user login",
    response_model=user_schema.TokenSchema,
    status_code=status.HTTP_200_OK,
)
def login_user(
    user_detail: user_schema.UserLoginSchema,
    mysql_session: Session = Depends(get_db_session),
) -> user_schema.UserSchema:
    """
    API to authenticate a user and return authentication token.
    """

    try:
        return user_service.login_user(mysql_session, user_detail)
    except exceptions.NotAuthorized as e:
        raise e
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": "Unexpected error in authenticating the user"},
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


@router.get(
    "/me/",
    description="API to retrieve authenticated user details",
    response_model=user_schema.UserSchema,
    status_code=status.HTTP_200_OK,
)
def get_user(
    current_user=Depends(auth.get_current_active_user),
    mysql_session: Session = Depends(get_db_session),
) -> user_schema.UserSchema:
    """
    API to retrieve user details if the user client is authenticated.
    """

    try:
        return current_user
    except Exception as e:
        logger.error(e)
        return JSONResponse(
            content={"detail": str(e)}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
        )