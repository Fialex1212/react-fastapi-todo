from fastapi import HTTPException
from sqlalchemy.orm import Session
from .models import Todo as DBTodo
from .schemas import TodoCreate, TodoUpdate
from sqlalchemy.exc import IntegrityError


def create_todo(
    db: Session, 
    todo: TodoCreate
):
    db_todo = DBTodo(**todo.model_dump())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def get_todo(
    db: Session, 
    todo_id: str
):
    return db.query(DBTodo).filter(DBTodo.id == todo_id).first()

def get_todos(
    db: Session, 
    skip: int = 0, 
    limit: int = 10
):
    return db.query(DBTodo).offset(skip).limit(limit).all()

def update_todo(
    db: Session, 
    todo_id: str, 
    todo_update: TodoUpdate
):
    db_todo = db.query(DBTodo).filter(DBTodo.id == todo_id).first()
    if db_todo:
        if todo_update.title is not None:
            db_todo.title = todo_update.title
        if todo_update.description is not None:
            db_todo.description = todo_update.description
        if todo_update.is_completed is not None:
            db_todo.is_completed = todo_update.is_completed

        try:
            db.commit()
            db.refresh(db_todo)
            return db_todo
        except IntegrityError:
            db.rollback()
            raise HTTPException(status_code=400, detail="Integrity error occurred")
    return db_todo

def delete_todo(
    db: Session, 
    todo_id: str
):
    db_todo = db.query(DBTodo).filter(DBTodo.id == todo_id).first()
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return db_todo
