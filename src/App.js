import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./components/NavBar/navBar";
import CartContext from "./context/CartContext";
import UserContext from "./context/UserContext";
import {
  Login,
  Dashboard,
  ConfigScreen,
  NotFound,
  Customers,
  CustomerForm,
  ProductCatalog,
  ProductForm,
  Categories,
  EmployeeList,
  EmployeeForm,
  EmployeeProfile,
  EmployeeWorkingHour,
  UserRoles,
  UpdateInventory,
  StockUpdateForm,
  AccessDenied,
  CashierSalePage,
  UserProfile,
  Suppliers,
  SupplierProfile,
  SupplierForm,
  BranchDetails,
  BranchForm,
} from "./screens";
import "./App.css";
import { decodeJWT } from "./services/authenticationService";
import { Toaster } from "react-hot-toast";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    // Store the current page's pathname in session storage.
    if (pathname !== "/login")
      sessionStorage.setItem("lastVisitedPage", pathname);
  }, [window.location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setCurrentUser(decodeJWT(token));
  }, []);

  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <UserContext.Provider
        value={{ currentUser: currentUser, setCurrentUser: setCurrentUser }}
      >
        {!currentUser && (
          <Switch>
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
        )}
        {currentUser && (
          <React.Fragment>
            <NavBar />
            {/* <div className="row" style={{ backgroundColor: "#282C35" }}>
              <div className="col-3">
                <SideBar />
              </div>
              <div
                className="col"
                style={{ backgroundColor: "white", borderWidth: 5 }}
              > */}
            <Switch>
              {/* Employees Management */}
              <Route path="/employee/roles" component={UserRoles} />
              <Route path="/employee/profile" component={EmployeeProfile} />
              <Route path="/employee/working" component={EmployeeWorkingHour} />
              <Route path="/employee/:id" component={EmployeeForm} />
              <Route path="/employee" component={EmployeeList} />
              {/* Inventory Management */}
              <Route path="/inventory/catalog" component={ProductCatalog} />
              <Route path="/inventory/categories/:id" component={Categories} />
              <Route path="/inventory/update/:id" component={StockUpdateForm} />
              <Route path="/inventory/update" component={UpdateInventory} />
              <Route path="/inventory/:id" component={ProductForm} />
              {/* Supplier Management */}
              <Route path="/suppliers/profile" component={SupplierProfile} />
              <Route path="/suppliers/:id" component={SupplierForm} />
              <Route path="/suppliers" component={Suppliers} />
              {/* Customer Management */}
              <Route path="/customers/:id" component={CustomerForm} />
              <Route path="/customers" component={Customers} />
              {/* Branch Management */}
              <Route path="/branch/:id" component={BranchDetails} />
              <Route path="/branch" component={BranchForm} />
              {/* Common */}
              <Route path="/sale" component={CashierSalePage} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/user-profile" component={UserProfile} />
              <Route path="/config" component={ConfigScreen} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/access-denied" component={AccessDenied} />
              <Redirect from="/" exact to="/dashboard" />
              <Redirect to="/not-found" />
            </Switch>
            {/* </div> */}
            {/* </div> */}
          </React.Fragment>
        )}
        <Toaster
          position="bottom-right"
          reverseOrder={true}
          toastOptions={{ duration: 3000 }}
        />
      </UserContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
