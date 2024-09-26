import { useState } from "react";
import Popup from "../../Popup/Popup";
import css from "./styles.module.css";
import { MdClose } from "react-icons/md";

const TodoEdit = ({ item, updateTodo }) => {
  const { id, title, description, isCompleted } = item;
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    title: title,
    description: description,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveTodo = (id, formData, e) => {
    e.preventDefault();
    setShow(false)
    updateTodo(id, formData)
  }

  return (
    <>
      <button
        onClick={() => {
          setShow(true);
        }}
        className={css.todo__edit}
      >
        Edit
      </button>
      <Popup show={show} setShow={setShow}>
        <form className={css.form}>
          <button className={css.form__close} onClick={() => setShow(false)}><MdClose className={css.form__close_btn} size={40} /></button>
          <label>
            <input
              className={css.form__input}
              type="text"
              value={formData.title}
              onChange={handleChange}
              name="title"
              placeholder="title"
            />
          </label>
          <label>
            <input
              className={css.form__input}
              type="text"
              value={formData.description}
              onChange={handleChange}
              name="description"
              placeholder="description"
            />
          </label>
          <button className={css.form__button} onClick={(e) => saveTodo(id, formData, e)} >Save</button>
        </form>
      </Popup>
    </>
  );
};

export default TodoEdit;
