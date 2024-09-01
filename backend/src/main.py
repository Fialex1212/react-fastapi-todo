from fastapi import FastAPI
from .cors import add_cors
from .database import Base, engine
from .todos.routers import router as todos_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
add_cors(app)

app.include_router(todos_router, prefix="/todos", tags=["todos"])

@app.get("/")
async def root():
    return {"Message": "Hello world"}