import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";

import { addSupplier, getSupplier } from "../../services/supplierService";

class EmployeeForm extends Form {
  state = {
    data: {
      supplier_name: "",
      supplier_email: "",
      supplier_phone: "",
      supplier_address: "",
    },
    errors: {},
    accessLevel: "supplierForm",
  };

  schema = {
    supplier_name: Joi.string().required().label("Name"),
    supplier_email: Joi.string().required().label("Email").email(),
    supplier_phone: Joi.number().required().label("Phone Number"),
    supplier_address: Joi.string().required().label("Address"),
  };

  componentDidMount() {
    const supplierId = this.props.match.params.id;
    if (supplierId === "new") return;

    const Supplier = getSupplier(supplierId);
    if (!Supplier) return this.props.history.replace("/not-found");

    this.setState({ data: { ...Supplier } });
  }

  doSubmit = async () => {
    try {
      await addSupplier(this.state.data);
      this.props.history.goBack();
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
          <h1>Add New Supplier</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("supplier_name", "Name")}
            {this.renderInput("supplier_email", "Email")}
            {this.renderInput("supplier_phone", "Contact", "number")}
            {this.renderInput("supplier_address", "Address")}
            <div className="my-3">{this.renderButton("Save")}</div>
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default EmployeeForm;
