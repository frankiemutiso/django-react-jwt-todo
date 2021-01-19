import React from "react";
import "./TodoList.css";

import moment from "moment";

function TodoList({ todo, handleEdit, handleDelete, toggleComplete }) {
  const date = moment(todo.created);
  let formattedDate = date.format("DD.MM.YY");

  return (
    <div className="todoList">
      <div className="todoList__container">
        <div className="todoList__items" onClick={() => toggleComplete(todo)}>
          {todo.completed ? (
            <p className="todoList__title completed">{todo.title}</p>
          ) : (
            <p className="todoList__title">{todo.title}</p>
          )}

          <p className="todoList__date">Created on: {formattedDate}</p>
        </div>
        <div>
          <button className="todoList__edit" onClick={() => handleEdit(todo)}>
            Edit
          </button>
          <button
            className="todoList__delete"
            onClick={() => handleDelete(todo)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
