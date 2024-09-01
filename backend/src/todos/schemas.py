from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class BaseTodo(BaseModel):
    title: str
    description: Optional[str] = ""
    is_completed: Optional[bool] = False

class TodoCreate(BaseTodo):
    pass

class TodoUpdate(BaseTodo):
    title: Optional[str] = None
    description: Optional[str] = ""
    is_completed: Optional[bool] = False

class Todo(BaseTodo):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        form_attributes = True