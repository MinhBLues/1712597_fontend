import "./App.css";
import Home from "./page/home/Home";
import Dashboard from "./page/board/Dashboard";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Profile from "./page/Profile";
import {PrivateRoute, NormalRoute} from './PrivateRoute';
import React from "react";
import ListTask from "./page/task/ListTask";

function App() {
  
  return (
      <Router>
        <div className="App">
            <Switch>
              <NormalRoute exact path="/" component={Home} />
              <PrivateRoute path="/home" component={Dashboard} />
              <NormalRoute path="/login" component={Home} />
              <NormalRoute path="/signup" component={Home} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/board/task/:id" component={ListTask}/> 

              {/* <Route path="/404" component={PageError} />
              <Redirect from='*' to='/404' /> */}
            </Switch>
        </div>
      </Router>
  );
}

export default App;
