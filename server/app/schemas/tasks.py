from pydantic import BaseModel, validator
from fastapi import Query
from datetime import date

from app.db.sql.models import StatusEnum, PriorityEnum


def validate_completion_date(completion_date: date, values: dict) -> date:
    due_date = values.get("due_date")
    if not due_date:
        raise ValueError("Completion date can't be set without due date")

    return completion_date


def validate_due_date(due_date: date, values: dict) -> date:
    completion_date = values.get("completion_date")
    if completion_date and not due_date:
        raise ValueError("Due date can't be emptied if completion date is set")

    return due_date


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

    @validator("completion_date", pre=True)
    def validate_task_completion_date(cls, value, values):
        return validate_completion_date(value, values)

    @validator("due_date", pre=True)
    def validate_task_due_date(cls, value, values):
        return validate_due_date(value, values)


class TaskResponseSchema(BaseModel):
    id: int
    title: str
    description: str | None
    status: StatusEnum | None
    priority: PriorityEnum | None
    due_date: date | None
    completion_date: date | None

class TaskUpdateRequestSchema(BaseModel):
    title: str | None = None
    description: str | None = None
    status: StatusEnum | None = None
    priority: PriorityEnum | None = None
    due_date: date | None = None
    completion_date: date | None = None