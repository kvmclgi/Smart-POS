import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";
import toast from "react-hot-toast";

import { getCustomer, addCustomer } from "../../services/customerService";

class CustomerForm extends Form {
  state = {
    data: {
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      customer_address: "",
    },
    errors: {},
    accessLevel: "customerForm",
  };

  schema = {
    customer_name: Joi.string().required().label("Name"),
    customer_phone: Joi.number().label("Contact Number"),
    customer_email: Joi.string().email().label("Email"),
    customer_address: Joi.string().label("Address"),
  };

  componentDidMount() {
    const customerId = this.props.match.params.id;
    if (customerId === "new") return;

    const customer = getCustomer(customerId);
    if (!customer) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(customer) });
  }

  mapToViewModel(customer) {
    return {
      customer_name: customer.customer_name,
      customer_phone: customer.customer_phone,
      customer_email: customer.customer_email,
      customer_address: customer.customer_address,
    };
  }

  doSubmit = async () => {
    try {
      const promise = addCustomer(this.state.data);
      toast.promise(promise, {
        loading: "Adding New Customer...",
        success: "New Customer Added",
        error: "Error Occured",
      });
      await promise;
      return this.props.history.replace("/customers");
    } catch (e) {
      console.log("Error Occured");
      console.log(e);
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
          <h1>Add New Customer</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("customer_name", "Name")}
            {this.renderInput("customer_phone", "Contact Number")}
            {this.renderInput("customer_email", "Email")}
            {this.renderInput("customer_address", "Address")}
            <div className="my-3">{this.renderButton("Save")}</div>
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default CustomerForm;
