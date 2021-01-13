import React, { Component } from "react";
import "./Signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  handleChange = (e) => {
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState[e.target.name] = e.target.value;

      return newState;
    });
  };

  render() {
    return (
      <div className="login">
        <form
          action=""
          onSubmit={(e) => this.props.handleSignup(e, this.state)}
        >
          <h3>Create an account</h3>
          <div className="login-inputs">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={this.state.password2}
              onChange={this.handleChange}
            />
          </div>
          <div className="login-btn">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
