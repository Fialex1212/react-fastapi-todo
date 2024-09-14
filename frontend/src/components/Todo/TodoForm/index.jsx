import {useState} from "react";
import css from "./styles.module.css";

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  //Function for handle inputs change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Function for not reload site and clear input after submit
  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();

    setFormData({
      title: "",
      description: "",
    });
  };

  return (
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
  );
};

export default TodoForm;
