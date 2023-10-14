import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group form-floating">
      <input {...rest} name={name} id={name} className="form-control" />
      <label htmlFor={name}>{label}</label>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
