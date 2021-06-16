import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import Home from './pages/home';
import AnotherPage from "./pages/anotherPage";
import './App.css';

const App = () => {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute exact path="/private-page" component={AnotherPage} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
