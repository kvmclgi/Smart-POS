import React from "react";
import Joi from "joi-browser";
import Form from "../../components/common/form";
import AccessFrame from "../../components/accessFrame";
import toast from "react-hot-toast";

import { getCategory, addCategory } from "./../../services/categoryService";

class Categories extends Form {
  state = {
    data: {
      category_name: "",
    },
    errors: {},
    accessLevel: "productForm",
  };

  schema = {
    category_name: Joi.string().required().label("Name"),
  };

  async componentDidMount() {
    const category_id = this.props?.match.params.id;
    if (category_id === "new") return;

    const { data: category } = await getCategory(category_id);
    if (!category) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(category) });
  }

  doSubmit = async () => {
    try {
      const promise = addCategory(this.state.data.category_name);
      toast.promise(promise, {
        pending: "...",
        success: "Category Added Successfully.",
        error: "Error Occured",
      });
      await promise;
      this.props.history.goBack();
    } catch (e) {
      console.log(e.response.data);
    }
  };

  render() {
    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.goBack()}
      >
        <div className="container my-3">
          <h1>Add New Category</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("category_name", "Name")}
            <div className="my-3">{this.renderButton("Save")}</div>{" "}
          </form>
        </div>
      </AccessFrame>
    );
  }
}

export default Categories;
