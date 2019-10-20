import React from "react";
import "./App.css";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";

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
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
