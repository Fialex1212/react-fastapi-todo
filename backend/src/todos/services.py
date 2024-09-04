from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from .models import Todo as DBTodo
from .schemas import TodoCreate, TodoUpdate
from sqlalchemy.exc import IntegrityError
from sqlalchemy.future import select


async def create_todo(
    db: AsyncSession, 
    todo: TodoCreate
):
    db_todo = DBTodo(**todo.model_dump())
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

async def get_todo(
    db: AsyncSession, 
    todo_id: str
):
    db_todo = await db.get(DBTodo, todo_id)
    return db_todo

async def get_todos(
    db: AsyncSession, 
    skip: int = 0, 
    limit: int = 10
):
    result = await db.execute(select(DBTodo).offset(skip).limit(limit))
    db_todos = result.scalars().all()
    return db_todos

async def update_todo(
    db: AsyncSession, 
    todo_id: str, 
    todo_update: TodoUpdate
):
    db_todo = await db.get(DBTodo, todo_id)
    if db_todo:
        if todo_update.title is not None:
            db_todo.title = todo_update.title
        if todo_update.description is not None:
            db_todo.description = todo_update.description
        if todo_update.is_completed is not None:
            db_todo.is_completed = todo_update.is_completed

        try:
            await db.commit()
            await db.refresh(db_todo)
            return db_todo
        except IntegrityError:
            await db.rollback()
            raise HTTPException(status_code=400, detail="Integrity error occurred")
    return db_todo

async def delete_todo(
    db: AsyncSession, 
    todo_id: str
):
    db_todo = await db.get(DBTodo, todo_id)
    if db_todo:
        await db.delete(db_todo)
        await db.commit()
    return db_todo
