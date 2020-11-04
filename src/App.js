import "./App.css";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Profile from "./page/Profile";
import Header from "./component/Header";
import {PrivateRoute, NormalRoute} from './PrivateRoute';
import React, { useState } from "react";
import Auth from "./services/AuthRepository";
import Task from "./page/Task";

function App() {
  
  const [authTokens, setAuthTokens] = useState(Auth.getCurrentUser());
  const header = authTokens ? <Header /> : null;
  return (
      <Router>
        <div className="App">
        { header }
            <Switch>
              {/* <Route exact path="/task" component={Task}/> */}
              <NormalRoute exact path="/" component={Home} />
              <PrivateRoute path="/home" component={Dashboard} />
              <NormalRoute path="/login" component={Home} />
              <NormalRoute path="/signup" component={Home} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/board/task/:id" component={Task}/> 

              {/* <Route path="/404" component={PageError} />
              <Redirect from='*' to='/404' /> */}
            </Switch>
        </div>
      </Router>
  );
}

export default App;
