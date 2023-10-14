import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import toast from "react-hot-toast";

import { resetPassword } from "../../services/authenticationService";

class ChangePasswordWindow extends Form {
  state = {
    data: {
      username: "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Name"),
    password: Joi.string().required().label("Password"),
    newPassword: Joi.string().required().label("New Password"),
    confirmNewPassword: Joi.string().required().label("Confirm Password"),
  };

  doSubmit = async () => {
    const { data: details } = this.state;
    if (details.newPassword != details.confirmNewPassword) {
      return this.setState({
        errors: { confirmNewPassword: "passwords didn't match " },
      });
    }
    try {
      await resetPassword(
        details.username,
        details.password,
        details.newPassword
      );
      const button = document.getElementById("closeWindow");
      button.click();
      toast.success("password changed");
      this.setState({
        data: {
          username: "",
          password: "",
          newPassword: "",
          confirmNewPassword: "",
        },
      });
    } catch (err) {
      console.log(err);
      this.setState({ errors: err.response.data.error });
    }
  };

  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        tabIndex="-1"
        role="ModalBase"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change Password
              </h5>
              <button
                id="closeWindow"
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="row modal-body">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("username", "Username")}
                {this.renderInput("password", "Current Password", "password")}
                {this.renderInput("newPassword", "New Password", "password")}
                {this.renderInput(
                  "confirmNewPassword",
                  "Confirm New Password",
                  "password"
                )}
                <div className="modal-footer">
                  <div className="my-3">
                    {this.renderButton("Change Password")}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePasswordWindow;
