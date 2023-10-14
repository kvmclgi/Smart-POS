import React from "react";

const SearchBox = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
