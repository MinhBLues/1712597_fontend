import "./App.css";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Profile from "./page/Profile";
import Header from "./component/Header";
import {PrivateRoute, NormalRoute} from './PrivateRoute';
import React, { useState } from "react";
import Auth from "./services/AuthRepository";

function App() {
  const router = new Router().history;
  const [authTokens, setAuthTokens] = useState(Auth.getCurrentUser());
  const setTokens = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
  }
  console.log(setTokens);
  const header = authTokens ? <Header /> : null;
  return (
      <Router>
        <div className="App">
        { header }
          <div className="container">
            <Switch>
              <NormalRoute exact path="/" component={Home} />
              <PrivateRoute path="/home" component={Dashboard} />
              <NormalRoute path="/login" component={Home} />
              <NormalRoute path="/signup" component={Home} />
              <PrivateRoute path="/profile" component={Profile} />

              {/* <Route path="/404" component={PageError} />
              <Redirect from='*' to='/404' /> */}
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;
