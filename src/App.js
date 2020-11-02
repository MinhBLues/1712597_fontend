import "./App.css";
import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./component/SignUp"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            {/* <Route path="/404" component={PageError} />
            <Redirect from='*' to='/404' /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
