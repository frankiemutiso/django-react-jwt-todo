import React, { Component } from "react";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
        <form action="" onSubmit={(e) => this.props.handleLogin(e, this.state)}>
          <h3>Login to your account</h3>
          <div className="login-inputs">
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="login-btn">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
