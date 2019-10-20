import React from "react";
import "./App.css";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Match from "./Match";
import Waiting from "./Waiting";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <h1>Login</h1>
              <LoginForm />
            </Route>
            <Route path="/Register">
              <h1>Register</h1>
              <Register />
            </Route>
            <Route path="/Match">
              <Match />
            </Route>
            <Route path="/Waiting">
              <Waiting />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
