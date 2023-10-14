import React from "react";

const SelectWithBtn = ({
  name,
  label,
  placeHolder,
  options,
  onClick,
  selectDisabled,
  btnTitle = "Confirm",
  btnDisabled,
  error,
  ...rest
}) => {
  return (
    <>
      <div className="row mb-3">
        <div className="col-7">
          <div className="form-group form-floating">
            <select
              name={name}
              id={name}
              className="form-select form-control"
              {...rest}
              disabled={selectDisabled}
            >
              <option defaultValue={""}>
                {placeHolder ? placeHolder : "Select"}
              </option>
              {options.map((option, index) => (
                <option key={index} value={option._id}>
                  {option.name}
                </option>
              ))}
            </select>
            {label && <label htmlFor={name}>{label}:</label>}
          </div>
        </div>
        <button
          disabled={btnDisabled}
          className="col btn btn-primary shadow-0"
          onClick={onClick}
          style={{ height: "40px", alignSelf: "center", marginRight: "10px" }}
        >
          {btnTitle}
        </button>
      </div>
      {error && (
        <div role="alert" className="alert alert-danger">
          {error}
        </div>
      )}
    </>
  );
};

export default SelectWithBtn;
