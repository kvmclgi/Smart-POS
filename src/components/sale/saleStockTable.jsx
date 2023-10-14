import React, { Component } from "react";
import Table from "../common/table";

class SaleStockTable extends Component {
  //   state = {
  //     quantity: 1,
  //   };

  //   handleQuantityChange = (e) => {
  //     this.setState({ quantity: e.currentTarget.value });
  //   };
  //   handleIncrement = () => {
  //     this.setState({ quantity: this.state.quantity + 1 });
  //   };
  //   handleDecrement = () => {
  //     this.setState({ quantity: this.state.quantity - 1 });
  //   };

  columns = [
    {
      path: "product_name",
      label: "Name",
    },
    { path: "quantity", label: "Stock" },
    { path: "retail_price", label: "Retail Price" },
    {
      key: "select",
      content: (product) => (
        <button
          disabled={product.quantity == 0}
          onClick={() => this.props.onSelect(product)}
          className="btn btn-danger btn-sm"
        >
          Add to Cart
        </button>
      ),
    },
  ];

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

export default SaleStockTable;
