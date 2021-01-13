import React from "react";
import "./TodoList.css";

import moment from "moment";

import { motion, AnimatePresence } from "framer-motion";

function TodoList({ todo, handleEdit, handleDelete, toggleComplete }) {
  const date = moment(todo.created);
  let formattedDate = date.format("DD.MM.YY");

  return (
    <div className="todoList">
      <AnimatePresence>
        <motion.div className="todoList__container" exit={{ x: -1000 }}>
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default TodoList;
