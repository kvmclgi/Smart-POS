import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import moment from "moment/moment";
import { getImageUrl } from "./../../services/imageHandler";
const NavBar = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand mx-3" to="/">
        Smart POS
      </NavLink>

      <div className="col" />

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/sale">
            Sale
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Customers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/suppliers">
            Suppliers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/inventory/catalog">
            Product Catalog
          </NavLink>
          <NavLink className="nav-item nav-link" to="/inventory/update">
            Stock Update
          </NavLink>
          <NavLink className="nav-item nav-link" to="/employee">
            Employee
          </NavLink>
          <NavLink className="nav-item nav-link" to="/config">
            Config
          </NavLink>
        </div>
      </div>

      <div className="col-1 mx-3">
        <span
          className="row"
          style={{ color: "black", fontSize: 12, justifyContent: "end" }}
        >
          {moment().format("dddd")}
        </span>
        <span
          className="row"
          style={{ color: "black", fontSize: 15, justifyContent: "end" }}
        >
          {moment().format("MMMM Do YYYY")}
        </span>
      </div>

      <div className="col-1" style={{ marginLeft: 20, marginRight: 20 }}>
        <span
          className="row"
          style={{ color: "black", fontSize: 10, justifyContent: "end" }}
        >
          Welcome,
        </span>
        <span
          className="row"
          style={{
            color: "black",
            fontSize: 15,
            justifyContent: "end",
            textAlign: "right",
          }}
        >
          {currentUser.employee_name}
        </span>
      </div>

      <NavLink className="nav-item nav-link" to="/user-profile">
        <img
          src={getImageUrl(currentUser.employee_image)}
          style={{ width: 40, aspectRatio: 1, marginLeft: 10, marginRight: 10 }}
          className="rounded-circle shadow-4"
          alt="Avatar"
        />
      </NavLink>
      <button
        className="btn btn-primary mx-3"
        onClick={() => {
          localStorage.removeItem("token");
          setCurrentUser(null);
        }}
        data-testid="logOutButton"
      >
        LogOut
      </button>
    </nav>
  );
};

export default NavBar;
