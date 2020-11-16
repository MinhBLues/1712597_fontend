import "./App.css";
import Home from "./page/home/Home";
import Dashboard from "./page/board/Dashboard";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Profile from "./page/Profile";
import {PrivateRoute, NormalRoute} from './PrivateRoute';
import React from "react";
import ListTask from "./page/task/ListTask";
import PageNotFound from "./page/PageNotFound";
import GooglePassword from "./page/GooglePassword";

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
              <PrivateRoute path="/board/:id" component={ListTask}/> 
              <PrivateRoute path="/share/board/:id" component={ListTask}/> 
              <Route path="/google/changePassword" render={(props) => <GooglePassword {...props}/>} />


              <Route path="/404" component={PageNotFound} />
              <Redirect from='*' to='/404' />
            </Switch>
        </div>
      </Router>
  );
}

export default App;
