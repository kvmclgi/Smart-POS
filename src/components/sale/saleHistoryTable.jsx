import React, { Component } from "react";
import Table from "../common/table";

class SaleHistoryViewTable extends Component {
  columns = [
    { path: "order_id", label: "Order ID" },
    { path: "customer", label: "Customer" },
    { path: "cashier_name", label: "Cashier" },
    { path: "payment_method", label: "Payment Method" },
    { path: "created_time", label: "Time(HH:MM:SS)" },
    { path: "total", label: "Total(Rs.)" },
    { path: "total_quantity", label: "Quantity" },
  ];

  render() {
    const { salesToday, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={salesToday}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default SaleHistoryViewTable;
