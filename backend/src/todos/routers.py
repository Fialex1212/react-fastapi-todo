from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Annotated
from .services import create_todo, get_todo, get_todos, update_todo, delete_todo
from .schemas import Todo, TodoCreate, TodoUpdate
from ..dependency import get_db

router = APIRouter()

@router.post("/create", response_model=Todo)
def create_todo_endpoint(
    todo: Annotated[TodoCreate, Depends()],
    db: Annotated[Session, Depends(get_db)],
):
    db_todo = create_todo(db=db, todo=todo)
    return db_todo

@router.get("/get/{todo_id}", response_model=Todo)
def get_todo_endpoint(
    todo_id: str,
    db: Annotated[Session, Depends(get_db)],
):
    db_todo = get_todo(db=db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo


@router.get("/get_todos", response_model=list[Todo])
def get_todos_endpoint(
    db: Annotated[Session, Depends(get_db)],
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(le=100)] = 10,
):
    return get_todos(db=db, skip=skip, limit=limit)


@router.put("/update/{todo_id}")
def update_todo_endpoint(
    todo_id: str,
    todo_update: Annotated[TodoUpdate, Depends()],
    db: Annotated[Session, Depends(get_db)],
):
    db_todo = update_todo(db=db, todo_id=todo_id, todo_update=todo_update)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo

@router.delete("/delete/{todo_id}")
def delete_todo_endpoint(
    todo_id: str,
    db: Annotated[Session, Depends(get_db)],
):
    db_todo = delete_todo(db=db, todo_id=todo_id)
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return db_todo