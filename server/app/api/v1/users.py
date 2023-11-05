from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas import users as user_schema
from app.services import users as user_sevice

router = APIRouter()


@router.post("/register", response_model=user_schema.UserSchema)
async def register_user(
    user_detail: user_schema.UserRegisterSchema
) -> user_schema.UserSchema:
    return user_service.register_user(user_detail)

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