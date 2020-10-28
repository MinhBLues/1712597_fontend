import "./App.css";
import Home from "./page/Home";
import Login from "./page/Login";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <div>
            <div>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                {/* <Route path="/404" component={PageError} />
                <Redirect from='*' to='/404' /> */}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
