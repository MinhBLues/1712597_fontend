import "./App.css";
import Home from "./page/Home";
import Dashboard from "./page/Dashboard";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Profile from "./page/Profile";
import Header from "./component/Header";

function App() {
  const router = new Router().history;
  console.log(router.location.pathname)
  return (
    <Router>
      <div className="App">
      {
        router.location.pathname !== "/" &&
        router.location.pathname !== "/login" &&
        router.location.pathname !== "/404" &&
        router.location.pathname !== "/SignUp" ? ( <Header />) : null
      }
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Dashboard} />
            <Route path="/login" component={Home} />
            <Route path="/signup" component={Home} />
            <Route path="/profile" component={Profile} />

            {/* <Route path="/404" component={PageError} />
            <Redirect from='*' to='/404' /> */}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
