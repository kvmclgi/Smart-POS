import React, { Component } from "react";
import Table from "../common/table";

class CustomerTable extends Component {
  columns = [
    {
      path: "customer_name",
      label: "Name",
    },
    { path: "customer_phone", label: "Contact" },
    { path: "customer_email", label: "Email" },
    { path: "rewards_points", label: "Point Count" },
  ];

  render() {
    const { customers, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomerTable;
