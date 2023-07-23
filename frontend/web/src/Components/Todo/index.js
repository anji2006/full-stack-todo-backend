import React, { useEffect, useState } from "react";

import "./index.css";
import TodoItem from "../TodoItem";
import axios from "axios";
import TodoForm from "../TodoForm";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [displayForm, setDisplayForm] = useState(true);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    try {
      const res = await axios.get("http://localhost:2006/todos");
      setTodos(res.data.data);
    } catch (err) {
      console.log("##### error while calling Get API", err);
    }
  };

  const addTodo = async (data) => {
    try {
      await axios.post("http://localhost:2006/todo", data);
      getAllTodos();
    } catch (err) {
      console.log("### this is error for addTodo", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:2006/todo/${id}`);
      getAllTodos();
    } catch (err) {
      //
    }
  };

  return (
    <div className="check">
      {<TodoForm addTodo={addTodo} />}
      <div>
        <ul className="todos-constainer ">
          {console.log("### what is todos", todos)}
          {todos?.map((eachItem, i) => (
            <TodoItem
              key={`todo-${i}`}
              deleteTodo={deleteTodo}
              data={eachItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
