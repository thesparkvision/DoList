from pydantic import BaseModel
from fastapi import Query
from datetime import date

from app.db.sql.models import StatusEnum, PriorityEnum


class TaskRequestSchema(BaseModel):
    title: str = Query(..., max_length=100)
    description: str | None = Query(None, max_length=100)
    status: StatusEnum | None = None
    priority: PriorityEnum | None = None
    due_date: date | None = Query(
        None,
        title="Due Date",
        description="Must be today or in the future",
        gt=date.today(),
    )
    completion_date: date | None = None


class TaskResponseSchema(BaseModel):
    id: int
    title: str
    description: str | None
    status: StatusEnum
    priority: PriorityEnum
    due_date: date | None
    completion_date: date | None
