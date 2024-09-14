import { useState, useEffect } from "react";
import css from "./styles.module.css";
import TodoList from "./TodoList";
import { PORT } from "../../utils/constans";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import TodoForm from "./TodoForm";

const Todo = () => {
  const [todoData, setTodoData] = useState([]);
  // const [selectedTodo, setSelectedTodo] = useState(null);

  console.log(todoData);

  //Function for load toods
  const loadTodos = async () => {
    try {
      const response = await axios.get(`${PORT}/todo/list`);
      console.log(response.data); // Check the response data here
      setTodoData(response.data);
      toast.success("Todos successfully loaded!!!");
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong: ", error);
    }
  };

  //Function for add todo
  const addTodo = async (formData) => {
    try {
      const response = await axios.post(`${PORT}/todo/create`, formData);
      console.log(response.data);
      toast.success("Todos successfully added!!!");
      loadTodos();
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong: ", error);
    }
  };

  //Function for delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${PORT}/todo/delete/${id}`);
      console.log(response.data);
      toast.success("Todos successfully deleted!!!");
      loadTodos();
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong: ", error);
    }
    const updateTodo = todoData.filter((todo) => todo.id !== id);
    setTodoData(updateTodo);
  };

  //Function for udpate todo
  const updateTodo = async (id) => {
    try {
      const response = await axios.put(`${PORT}/todo/update/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong: ", error);
    }
  };

  //ReactHook for load data after load page
  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <section className={css.section}>
      <div className="container">
        <h1 className={css.title}>Todo app</h1>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todoData={todoData}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
    </section>
  );
};

export default Todo;
