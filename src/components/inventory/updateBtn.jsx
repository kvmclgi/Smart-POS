import React from "react";

const UpdateBtn = ({
  label,
  value,
  handleIncrement,
  handleDecrement,
  handleInputChange,
  btnLabel,
  btnDisabled = false,
  onClick,
}) => {
  return (
    <>
      <h6 className="card-title mb-3">{label}</h6>
      <div
        className="btn-group col-6"
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleDecrement}
        >
          -
        </button>
        <input
          type="number"
          className="form-control text-center border "
          value={value}
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <button
        className="btn btn-primary shadow-0 col mx-2"
        disabled={btnDisabled}
        onClick={onClick}
      >
        {btnLabel}
      </button>
    </>
  );
};

export default UpdateBtn;
