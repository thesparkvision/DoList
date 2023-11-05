from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas import tasks as task_schema
from app.services import tasks as task_sevice

router = APIRouter()


@router.post("/", response_model=task_schema.TaskSchema)
async def create_task(
    task_detail: task_schema.TaskSchema
) -> task_schema.TaskSchema:
    return task_service.create_task(task_detail)

@router.patch("/{task_id}", response_model=task_schema.TaskSchema)
async def update_task(
    task_id: str,
    task_detail: task_schema.TaskSchema
) -> task_schema.TaskSchema:
    return task_service.update_task(task_id, task_detail)

@router.post("/{task_id}", response_model=task_schema.TaskSchema)
async def get_task(
    task_id: str
) -> task_schema.TaskSchema:
    return task_service.get_task(task_id)

@router.post("/{task_id}", response_model=list[task_schema.TaskSchema])
async def get_all_tasks(
    task_id: str
) -> list[task_schema.TaskSchema]:
    return task_service.get_all_tasks()