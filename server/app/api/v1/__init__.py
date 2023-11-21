from fastapi import APIRouter
from .tasks import router as tasks_router
from .users import router as users_router

v1_router = APIRouter()

v1_router.include_router(tasks_router, prefix="/tasks")
v1_router.include_router(users_router, prefix="/users")
