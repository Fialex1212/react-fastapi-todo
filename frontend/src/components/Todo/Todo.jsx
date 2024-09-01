import { useState, useEffect } from "react";
import css from "./styles.module.css";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/todos/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Netwrok response wat not ok");
      }

      const data = await response.json();
      console.log(data);

      loadTodos();
    } catch (error) {
      console.error("Error: ", error);
    }
    const updateTodo = todoData.filter((todo) => todo.id !== id);
    setTodoData(updateTodo);
  };

  const addTodo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/todos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(JSON.stringify(formData));

      if (!response.ok) {
        throw new Error("Netwrok response wat not ok");
      }

      const data = await response.json();
      console.log(data);

      loadTodos();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const loadTodos = () => {
    fetch("http://127.0.0.1:8000/todos/get_todos")
      .then((response) => response.json())
      .then((data) => {
        setTodoData(data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();

    setFormData({
      title: "",
      description: "",
    });
  };

  useEffect(() => {
    loadTodos();
  }, []);

  console.log(todoData);

  return (
    <section className={css.section}>
      <div className="container">
        <h1 className={css.title}>Todo app</h1>
        <form action="" className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.form__input}
            type="text"
            placeholder="Enter a title of todo"
            value={formData.title}
            onChange={handleInputChange}
            name="title"
          />
          <input
            className={css.form__input}
            type="text"
            placeholder="Enter a description of todo"
            value={formData.description}
            onChange={handleInputChange}
            name="description"
          />
          <button className={css.form__button} type="submit">
            Sumbit
          </button>
        </form>
        <ul className={css.todo__list}>
          {todoData.map(({ id, title, description, isCompleted }) => (
            <li className={css.todo__item} key={id}>
              <input type="checkbox" checked={isCompleted} />
              <div className={css.todo__text}>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
              <span
                className={css.todo__trash}
                onClick={() => deleteTodo(id)}
              ></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Todo;
