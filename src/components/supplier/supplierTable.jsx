import React, { Component } from "react";
import Table from "../common/table";

class SupplierTable extends Component {
  columns = [
    {
      path: "supplier_name",
      label: "Name",
    },
    { path: "supplier_phone", label: "Contact" },
    { path: "supplier_email", label: "Email" },
    { path: "supplier_address", label: "Address" },
    {
      key: "select",
      content: (employee) => (
        <button
          onClick={() => this.props.onSelect(employee)}
          className="btn btn-danger btn-sm"
        >
          Select
        </button>
      ),
    },
  ];

  render() {
    const { suppliers, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={suppliers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default SupplierTable;
