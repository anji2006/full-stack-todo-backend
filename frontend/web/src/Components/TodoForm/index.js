import React, { useState } from "react";
import "./index.css";

const TodoForm = (props) => {
  const { addTodo } = props;
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const onHandleSubmit = (e) => {
    // add todo logic
    e.preventDefault();
    addTodo(data);
  };

  const onChangeHandler = (e) => {
    let key = e.target.name;
    let val = e.target.value;
    setData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  return (
    <form className="form-box" onSubmit={onHandleSubmit}>
      <div className="input-box">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="title of task"
          value={data.title}
          onChange={onChangeHandler}
        />
      </div>
      <div className="input-box">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={onChangeHandler}
          placeholder="description of tast"
          value={data.description}
          rows={4}
          cols={50}
        />
      </div>
      <div className="btn-box">
        <button type="button">Cancel</button>
        <button type="submit" onClick={onHandleSubmit}>
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
