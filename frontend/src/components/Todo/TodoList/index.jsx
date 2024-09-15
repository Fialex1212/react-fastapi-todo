import css from "./styles.module.css";
import TodoEdit from "../TodoEdit";

const TodoList = ({ todoData, deleteTodo, updateTodo }) => {
  const handlePopupInput = (event) => {
    const { name, value } = event.target;
  };

  if (!Array.isArray(todoData)) {
    return <p>No todos available.</p>;
  }

  return (
    <ul className={css.todo__list}>
      {todoData?.map((item) => {
        const { id, title, description, isCompleted } = item;
        return (
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
            <TodoEdit item={item} updateTodo={updateTodo}/>
            <button
              className={css.todo__trash}
              onClick={() => deleteTodo(id)}
            ></button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
