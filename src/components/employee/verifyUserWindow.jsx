import React, { useState } from "react";
import Input from "../common/input";

import { authenticate } from "../../services/authenticationService";
import toast from "react-hot-toast";

const VerifyUserWindow = ({ id, verify, setToken, setVerified }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      const { data: response } = await authenticate({ username, password });
      setVerified(true);
      if (setToken) setToken(response.token);
      verify();
      toast.success("Verified");
      const button = document.getElementById("closeButton");
      button.click();
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="ModalBase"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Verify User
            </h5>
            <button
              id="closeButton"
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="row modal-body">
            {error && (
              <div className="alert alert-danger">{error.username}</div>
            )}
            <div>
              <Input
                label={"Username"}
                name={"username"}
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
            </div>
            <div className="mt-3 mb-1">
              <Input
                label={"Password"}
                name={"password"}
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleVerify}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUserWindow;
