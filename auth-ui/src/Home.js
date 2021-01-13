import React, { Component } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Form
          activeItem={this.props.activeItem}
          handleChange={this.props.handleChange}
          handleSubmit={this.props.handleSubmit}
        />
        {this.props.todos.length > 0 ? (
          this.props.todos.map((todo) => (
            <TodoList
              key={todo.id}
              todo={todo}
              handleDelete={this.props.handleDelete}
              handleEdit={this.props.handleEdit}
              toggleComplete={this.props.toggleComplete}
            />
          ))
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}

export default Home;
