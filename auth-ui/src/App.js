import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import "./App.css";

class App extends Component {
  state = {
    loggedIn: localStorage.getItem("token") ? true : false,
    todos: [],
    activeItem: {
      title: "",
      completed: false
    },
    editing: false,
    error: ""
  };

  // Login Logic

  handleLogin = (e, credentials) => {
    e.preventDefault();


    fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then((response) => response.json())
      .then((data) => {
        // check if an access token is provided
        if (data.hasOwnProperty("access")) {
          localStorage.setItem("token", data.access);
          this.setState({
            loggedIn: true,
            error: ""
          });
        } else {
          console.log(data.detail);
          this.setState({ error: data.detail });
        }
      })
      .catch((error) => console.log(error));

    setTimeout(() => {
      this.setState({ error: "" });
    }, 10000);
  };

  // Signup Logic

  handleSignup = (e, credentials) => {
    e.preventDefault();

    if (!credentials) return;

    fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then((response) => response.json())
      .then((data) => {
        // check the property that is returned by API
        if (data.hasOwnProperty("username")) {
          this.setState({ error: data.username[0] });
          console.log(data.username[0]);
        } else if (data.hasOwnProperty("email")) {
          this.setState({ error: data.email });
          console.log(data.email);
        } else {
          // if everything is okay log in
          localStorage.setItem("token", data.access);
          this.setState({
            loggedIn: true,
            error: ""
          });
        }
      })
      .catch((error) => console.log(error.detail));

    setTimeout(() => {
      this.setState({ error: "" });
    }, 10000);
  };

  handleLogout = (e) => {
    localStorage.removeItem("token");
    this.setState({ loggedIn: false, todos: [] });
  };

  // Fetch resources belonging to logged in user
  fetchTasks = () => {
    if (this.state.loggedIn) {
      fetch("http://127.0.0.1:8000/api/todos/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ todos: data });
        });
    }
  };

  // fetch resources after logging in
  componentDidUpdate(prevProps, prevState) {
    if (prevState.loggedIn !== this.state.loggedIn) {
      this.fetchTasks();
    }
  }

  // fetch resources once when the page is refreshed
  componentDidMount() {
    this.fetchTasks();
  }

  handleChange = (e) => {
    const newState = { ...this.state.activeItem };
    newState[e.target.name] = e.target.value;

    this.setState({ activeItem: newState });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // check if editing then edit relevant todo

    if (this.state.editing) {
      fetch(`http://127.0.0.1:8000/api/todos/${this.state.activeItem.id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.activeItem)
      })
        .then(() => {
          this.fetchTasks();
          this.setState({
            activeItem: {
              title: "",
              completed: false
            },
            editing: false
          });
        })
        .catch((error) => console.log("Error: ", error));
    }
    // if not editing post a new todo
    else {
      fetch("http://127.0.0.1:8000/api/todos/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.activeItem)
      })
        .then(() => {
          this.fetchTasks();
          this.setState({
            activeItem: {
              title: "",
              completed: false
            }
          });
        })
        .catch((error) => console.log("Error: ", error));

      this.setState({
        activeItem: {
          title: "",
          completed: false
        }
      });
    }
  };

  // set editing to true and set activeItem to current todo

  handleEdit = (todo) => {
    this.setState({
      editing: true,
      activeItem: todo
    });
  };

  handleDelete = (todo) => {
    const url = `http://127.0.0.1:8000/api/todos/${todo.id}/`;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    }).then(() => this.fetchTasks());
  };

  toggleComplete = (todo) => {
    todo.completed = !todo.completed;

    const url = `http://127.0.0.1:8000/api/todos/${todo.id}/`;

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title: todo.title, completed: todo.completed })
    }).then(() => {
      this.fetchTasks();
    });
  };

  render() {
    return (
      <Router>
        <div className="app">
          <nav className="app__nav">
            <Link className="app__brand" to="/">
              React-Django-JWT Todo App
            </Link>
            {this.state.loggedIn ? (
              <div className="app__loggedIn">
                <button onClick={this.handleLogout}>Logout</button>
              </div>
            ) : (
              <ul className="nav__list">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </ul>
            )}
          </nav>

          <div className="app__container">
            {this.state.error === "" ? (
              <span></span>
            ) : (
              <span className="app__error">{this.state.error}</span>
            )}

            <Switch>
              <Route path="/signup">
                {this.state.loggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Signup handleSignup={this.handleSignup} />
                )}
              </Route>
              <Route path="/login">
                {this.state.loggedIn ? (
                  <Redirect to="/" />
                ) : (
                  <Login handleLogin={this.handleLogin} />
                )}
              </Route>
              <Route path="/">
                {this.state.loggedIn ? (
                  <Home
                    todos={this.state.todos}
                    activeItem={this.state.activeItem}
                    handleChange={this.handleChange}
                    handleEdit={this.handleEdit}
                    handleSubmit={this.handleSubmit}
                    handleDelete={this.handleDelete}
                    toggleComplete={this.toggleComplete}
                  />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
