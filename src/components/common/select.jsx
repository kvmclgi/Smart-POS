import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group form-floating">
      <select
        name={name}
        id={name}
        {...rest}
        className="form-control form-select"
      >
        <option selected defaultValue={""}>
          open this select menu
        </option>
        {options.map((option, index) => (
          <option key={index} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      <label htmlFor={name}>{label}</label>
      {error && (
        <div role="alert" className="alert alert-danger">
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
