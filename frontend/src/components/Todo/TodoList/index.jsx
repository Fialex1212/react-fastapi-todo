import { useState } from "react";
import css from "./styles.module.css";

const TodoList = ({ todoData, deleteTodo, updateTodo }) => {
  const [show, setShow] = useState(false);

  if (!Array.isArray(todoData)) {
    return <p>No todos available.</p>;
  }

  return (
    <ul className={css.todo__list}>
      {todoData.map(({ id, title, description, isCompleted }) => (
        <li className={css.todo__item} key={id}>
          <input
            className={css.todo__checkbox}
            type="checkbox"
            checked={isCompleted}
          />
          <div className={css.todo__text}>
            <h2 className={css.todo__title}>{title}</h2>
            <p className={css.todo__description}>{description}</p>
          </div>
          <button onClick={() => {udpateTodo(id)}} className={css.todo__edit}>
            Edit
          </button>
          <button
            className={css.todo__trash}
            onClick={() => deleteTodo(id)}
          ></button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
