import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";
import toast from "react-hot-toast";

import { getAllBranches } from "../../services/branchService";
import { getEmployee } from "../../services/employeeService";
import { getUserRoles } from "../../services/authorizationService";
import { registerEmployee } from "../../services/authenticationService";

class EmployeeForm extends Form {
  state = {
    data: {
      employee_name: "",
      employee_userName: "",
      employee_email: "",
      employee_phone: "",
      role_id: "",
      branch_id: "",
    },
    branches: [],
    userRoles: [],
    errors: {},
    accessLevel: "addEmployee",
  };

  schema = {
    employee_name: Joi.string().required().label("Name"),
    employee_userName: Joi.string().required().label("User Name"),
    employee_email: Joi.string().required().label("Email").email(),
    employee_phone: Joi.number().required().label("Phone Number"),
    branch_id: Joi.required().label("Branch"),
    role_id: Joi.required().label("User Role"),
  };

  fetchData = async () => {
    const { data: branches } = await getAllBranches();
    const { data: roles } = await getUserRoles();
    const branchList = branches.map((b) => ({
      _id: b.branch_id,
      name: b.branch_city,
    }));
    const rolesList = roles.map((r) => ({ _id: r.role_id, name: r.role_name }));
    this.setState({ branches: branchList, userRoles: rolesList });
  };

  componentDidMount() {
    this.fetchData();

    const employeeId = this.props.match.params.id;
    if (employeeId === "new") return;

    const Employee = getEmployee(employeeId);
    if (!Employee) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(Employee) });
  }

  mapToViewModel(Employee) {
    return {
      name: Employee.name,
      email: Employee.email,
      phone: Employee.phone,
      role: Employee.role,
      userRole_id: Employee.userRole_id,
      userRole_name: Employee.userRole_name,
      branch: Employee.branch,
    };
  }

  mapToDataModel(Employee) {
    const userRole_obj = this.state.userRoles.find(
      (obj) => obj.name === this.state.data.userRole
    );
    const branch_obj = this.state.branches.find(
      (obj) => obj.name === this.state.data.branch
    );
    console.log("userRole_obj", userRole_obj);
    console.log("branch_obj", branch_obj);
    console.log("Employee", Employee);
    return {
      name: Employee.name,
      username: Employee.userName,
      email: Employee.email,
      phone: Employee.phone,
      role_id: userRole_obj.userRole_id,
      branch_id: branch_obj.branch_id,
    };
  }

  doSubmit = async () => {
    try {
      console.log(this.state.data);
      const promise = registerEmployee(this.state.data);
      toast.promise(promise, {
        loading: "Adding new Employee...",
        success: "New Employee Added",
        error: "Error Occured",
      });
      await promise;
      return this.props.history.goBack();
    } catch (e) {
      console.log("Error Occured");
      console.log(e.response.data);
      this.setState({ errors: { ...e.response.data.error } });
    }
  };

  render() {
    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.goBack()}
      >
        <div className="container my-3">
          <h1>Add New Employee</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("employee_name", "Name")}
            {this.renderInput("employee_userName", "User Name")}
            {this.renderInput("employee_email", "Email")}
            {this.renderInput("employee_phone", "Contact", "number")}
            {this.renderSelect("branch_id", "Branch", this.state.branches)}
            {this.renderSelect("role_id", "userRole", this.state.userRoles)}
            <div className="my-3">{this.renderButton("Save")}</div>
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default EmployeeForm;
