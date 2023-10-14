import React, { Component } from "react";
import Table from "../common/table";
import { getImageUrl } from "../../services/imageHandler";

class StockTable extends Component {
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
    {
      key: "lowStock",
      label: "Stock",
      content: (product) =>
        this.props.checkLowStock(product) ? (
          <p style={{ color: "red" }}>{product.quantity}</p>
        ) : (
          <p>{product.quantity}</p>
        ),
    },
    { path: "updated_on", label: "Updated on" },
    {
      key: "select",
      content: (product) => (
        <button
          onClick={() => this.props.onSelect(product)}
          className="btn btn-danger btn-sm"
        >
          Select
        </button>
      ),
    },
  ];
  //     name: "Muffin Chocolate Individual Wrap",
  //     description: "Pork - Tenderloin, Frozen",
  //     category: "Comedy|Drama|Romance",
  //     image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
  //     buyingPrice: "$48.67",
  //     retailPrice: "$8.85",
  //     barcode: "55154-5980",
  //     supplier_id: 98,

  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default StockTable;
