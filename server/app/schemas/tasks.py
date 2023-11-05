from pydantic import BaseModel
from datetime import date

class TaskSchema(BaseModel):
    title: str
    description: str | None = None
    status: str | None = None
    priority: str | None = None
    due_date: date | None = None
    completion_date: date | None = None