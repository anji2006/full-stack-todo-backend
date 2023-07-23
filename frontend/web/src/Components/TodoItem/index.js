import React from "react";
import { MdCreate, MdDelete } from "react-icons/md";

const TodoItem = (props) => {
  const { data, deleteTodo } = props;
  const { title, description, id } = data;
  const itemNo = Math.ceil(Math.random() * 8);
  return (
    <li className={`todo-item item-${itemNo}`}>
      <div className="content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="btn-box">
        <MdCreate className="edit-btn " />
        <MdDelete className="delete-btn" onClick={() => deleteTodo(id)} />
      </div>
    </li>
  );
};

export default TodoItem;
