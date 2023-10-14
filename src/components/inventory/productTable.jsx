import React, { Component } from "react";
import Table from "../common/table";
import { getImageUrl } from "../../services/imageHandler";

class ProductTable extends Component {
  columns = [
    {
      key: "image",
      content: (product) => (
        <img
          src={getImageUrl(product.product_image[0])}
          style={{ width: 40, aspectRatio: 1, marginLeft: 10, marginRight: 10 }}
          className="shadow-4 rounded"
          alt="product_image"
        />
      ),
    },
    {
      path: "product_name",
      label: "Name",
    },
    { path: "category_name", label: "Category" },
    { path: "buying_price", label: "Buying Price" },
    { path: "retail_price", label: "Retail Price" },
    { path: "product_barcode", label: "Barcode" },
    { path: "supplier_id", label: "Supplier ID" },
    {
      key: "Delete",
      content: (product) => (
        <button
          onClick={() => this.props.onDelete(product.product_id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={products.map((product) => ({
          ...product,
          buying_price: "Rs. " + product.buying_price,
          retail_price: "Rs. " + product.retail_price,
        }))}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProductTable;
