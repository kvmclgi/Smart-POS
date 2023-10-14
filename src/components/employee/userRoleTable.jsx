import React, { Component } from "react";
import Table from "../common/table";

class UserRoleTable extends Component {
  columns = [
    {
      path: "role_name",
      label: "Name",
    },
    // {
    //   key: "space",
    //   content: () => {},
    // },
    {
      key: "select",
      content: (role) => (
        <>
          <button
            // style={{ width: 100 }}
            onClick={() => this.props.onSelect(role)}
            className="btn btn-primary btn-sm mx-3"
          >
            Select
          </button>
          <button
            disabled={role.role_name.toLowerCase() === "owner"}
            onClick={() => this.props.onDelete(role)}
            className="btn btn-danger btn-sm mx-3"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  render() {
    const { userRoles, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={userRoles}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UserRoleTable;
