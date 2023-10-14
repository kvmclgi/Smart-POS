import React, { Component } from "react";
import Table from "../common/table";

class EmployeeTable extends Component {
  columns = [
    {
      path: "employee_name",
      label: "Name",
    },
    { path: "employee_email", label: "Email" },
    { path: "role_name", label: "Role" },
    { path: "branch_name", label: "Branch" },
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
  //   columns = [
  //     {
  //       path: "title",
  //       label: "Title",
  //       content: (movie) => (
  //         <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
  //       ),
  //     },
  //     { path: "genre.name", label: "Genre" },
  //     { path: "numberInStock", label: "Stock" },
  //     { path: "dailyRentalRate", label: "Rate" },
  //     {
  //       key: "like",
  //       content: (movie) => (
  //         <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
  //       ),
  //     },
  //     {
  //       key: "delete",
  //       content: (movie) => (
  //         <button
  //           onClick={() => this.props.onDelete(movie)}
  //           className="btn btn-danger btn-sm"
  //         >
  //           Delete
  //         </button>
  //       ),
  //     },
  //   ];

  render() {
    const { employees, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={employees}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default EmployeeTable;
