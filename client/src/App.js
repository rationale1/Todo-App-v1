import React from "react";
// import "./StyleSheet/app.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Todos from "./components/Todos/Todos";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Navigation from "./components/NavBar/Navigation";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector(state => state.auth);
  return (
    <div className="container">
      <ToastContainer></ToastContainer>
      <Router>
        <Navigation />

        <main className="p-5">
          <Switch>
            <Route exact path="/">
              {userInfo ? <Todos /> : <Redirect to="/signin" />}
            </Route>

            <Route path="/signin">
              {userInfo ? <Redirect to="/" /> : <Login />}
            </Route>

            <Route path="/signup">
              {userInfo ? <Redirect to="/" /> : <Register />}
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
