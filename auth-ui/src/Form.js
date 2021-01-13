import React, { Component } from "react";
import "./Form.css";

class Form extends Component {
  render() {
    return (
      <div className="form">
        <form action="" onSubmit={this.props.handleSubmit}>
          <input
            type="text"
            placeholder="Create a new task..."
            name="title"
            value={this.props.activeItem.title}
            onChange={this.props.handleChange}
          />

          <button className="form__btn" type="submit">
            Create task
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
