import React from "react";
import Joi from "joi-browser";
import Form from "../components/common/form";
import UserContext from "../context/UserContext";

import { authenticate, decodeJWT } from "../services/authenticationService";

class Login extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
    setUser: null,
  };

  schema = {
    username: Joi.string().required().label("Name"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) return;
    this.state.setUser(decodeJWT(token));
    const lastVisitedPage = sessionStorage.getItem("lastVisitedPage");
    console.log(lastVisitedPage);
    if (lastVisitedPage) return this.props.history.replace(lastVisitedPage);
    this.props.history.replace("/dashboard");
  }

  doSubmit = async () => {
    try {
      const { data: response } = await authenticate(this.state.data);
      localStorage.setItem("token", response.token);
      this.state.setUser(decodeJWT(response.token));
      this.props.history.replace("/dashboard");
    } catch (e) {
      console.log("Error Occured");
      this.setState({ errors: { ...e.response.data.error } });
    }

    // if (user) {
    //   this.state.setUser({ ...user });
    //   console.log("user", user);
    //
    // } else {
    //   const errors = { ...this.state.errors };
    //   const errorMessage = "user does not exist";
    //   errors.userName = errorMessage;
    //   this.setState({ errors });
    // }
  };

  render() {
    return (
      <UserContext.Consumer>
        {(UserContext) => {
          this.state.setUser = UserContext.setCurrentUser;
          return (
            <div
              className="container row"
              style={{
                alignContent: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <div
                className="col-8"
                style={{
                  fontSize: "6vw",
                  alignSelf: "center",
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                }}
              >
                SmartPOS
              </div>
              <div className="col">
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("username", "Name")}
                  {this.renderInput("password", "Password", "password")}
                  <div className="my-3">{this.renderButton("Login")}</div>
                </form>
              </div>
            </div>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Login;
