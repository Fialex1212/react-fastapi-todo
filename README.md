# React&Django Todo App

## Description
A simple Todo application using **React(vite)** and **Django** for task management. It allows you to add, edit, and delete tasks, as well as mark them as completed.

## Features
- Adding new tasks.
- Editing existing tasks.
- Deleting tasks.
- Marking tasks as completed.

## Installation

Clone my project
```cmd
    git clone https://github.com/Fialex1212/react-fastapi-todo.git
```

### Frontend
Run the frontend

```bash
  cd frontend
  npm install
  npm run dev
```

### Backend
Run the backend

```cmd
  cd backend
  python -m venv venv
  .\venv\scripts\activate
  pip install requirements.txt
  uvicorn src.main:app
```## API Reference

### Create a todo

```http
  POST /api/todo/create
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `todo` | `TodoCreate` | **Required**. Data of task |

#### Query example
```json
{
    "title": "Create new app",
    "description": "Create new app with cool functional",
}
```
#### Response example
```json
  {
    "title": "Title",
    "description": "Description",
    "is_completed": false,
    "id": "a46283a7-368d-4725-a4e2-dcf6698bc4a8",
    "created_at": "2024-09-26T15:40:37.044667",
    "updated_at": "2024-09-26T15:40:37.044667"
  }
```
### Get todo

```http
  GET /api/todo/get/{todo_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `todo_id`      | `string` | **Required**. Id of todo |

#### Response example
```json
  {
    "title": "Title",
    "description": "Description",
    "is_completed": false,
    "id": "a46283a7-368d-4725-a4e2-dcf6698bc4a8",
    "created_at": "2024-09-26T15:40:37.044667",
    "updated_at": "2024-09-26T15:40:37.044667"
  }
```

### Get list of todo

```http
  GET /api/todo/list?skip={skip}&limit={limit}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `skip`      | `int` | Skip first N tasks (default 0) |
| `limit`      | `int` | Limit the number of tasks (default 100) |

#### Response example
```json
[
  {
    "title": "Title",
    "description": "Description",
    "is_completed": false,
    "id": "a2dc9498-1da2-4106-8dd5-8093028912ae",
    "created_at": "2024-09-26T15:40:37.044667",
    "updated_at": "2024-09-26T15:40:37.044667"
  },
  {
    "title": "Title",
    "description": "Description",
    "is_completed": false,
    "id": "a46283a7-368d-4725-a4e2-dcf6698bc4a8",
    "created_at": "2024-09-26T15:40:37.044667",
    "updated_at": "2024-09-26T15:40:37.044667"
  }
]
```
### Update todo

```http
  PUT /api/todo/update/{todo_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `todo_id`      | `string` | **Required**. Id of todo |

#### Query example
```json
{
  "title": "Title",
  "description": "Description",
  "is_completed": true
}
```
#### Response example
```json
{
  "created_at": "2024-09-26T15:40:37.044667",
  "description": "Description",
  "is_completed": false,
  "id": "a46283a7-368d-4725-a4e2-dcf6698bc4a8",
  "title": "Title",
  "updated_at": "2024-09-26T15:40:37.044667"
}
```

### Delete todo

```http
  DELETE /api/todo/delete/{todo_id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `todo_id`      | `string` | **Required**. Id of todo |


#### Response example
```json
{
  "created_at": "2024-09-26T15:40:37.044667",
  "description": "Description",
  "is_completed": false,
  "id": "a46283a7-368d-4725-a4e2-dcf6698bc4a8",
  "title": "Title",
  "updated_at": "2024-09-26T15:40:37.044667"
}
```
## Screenshots

### Desktop
![App Screenshot](./images/1.jgp)

### table
![App Screenshot](./images/2.jgp)

### mobile
![App Screenshot](./images/3.jgp)


## Authors

- [@Aleks Seriakov](https://github.com/Fialex1212)

