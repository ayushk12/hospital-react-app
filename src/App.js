import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import "moment-timezone";

import Navbar from "./components/Navbar";
import Home from "./components/Home";

import NewReport from "./components/NewReport";
import AuthForm from "./components/AuthForm";

import { getCurrentUser, getJwt, setTokenHeader } from "./services/authService";
import "./index.css";

class App extends Component {
  state = {
    doctor: null,
  };

  setDoctor = () => {
    const doctor = getCurrentUser(getJwt());
    this.setState({ doctor });
  };

  componentDidMount() {
    this.setDoctor();
    const doctor = getCurrentUser(getJwt());
    if (doctor) {
      setTokenHeader(getJwt());
    } else {
      this.props.history.push("/login");
    }
  }
  render() {
    return (
      <Fragment>
        <Navbar user={getCurrentUser(getJwt())} />
        <Switch>
          <Route path="/" exact component={Home} />

          <Route path="/newReport" component={NewReport} />
          <Route
            path="/login"
            render={(props) => (
              <AuthForm
                {...props}
                header="Log-in to your account"
                type="Login"
                setUser={this.setDoctor}
              />
            )}
          />
          <Route
            path="/register"
            render={(props) => (
              <AuthForm
                {...props}
                header="Register account"
                type="Register"
                setUser={this.setDoctor}
              />
            )}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
