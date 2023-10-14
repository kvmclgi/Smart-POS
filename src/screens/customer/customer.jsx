import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import SearchBox from "../../components/common/searchBox";
import Pagination from "../../components/common/pagination";
import AccessFrame from "../../components/accessFrame";
import CustomerTable from "../../components/customer/customerTable";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

import { getCustomers } from "../../services/customerService";

class Customers extends Component {
  state = {
    customers: [],
    currentPage: 1,
    pageSize: 30,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
    accessLevel: "customers",
  };

  async fetchData() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  componentDidMount() {
    this.fetchData();
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      customers: allCustomers,
    } = this.state;

    let filtered = allCustomers;
    if (searchQuery)
      filtered = allCustomers.filter(
        (m) =>
          m.customer_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.customer_phone.toString().startsWith(searchQuery)
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const Customers = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: Customers };
  };

  render() {
    const { length: count } = this.state.customers;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no Customers in the database.</p>;

    const { totalCount, data: customers } = this.getPagedData();

    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.goBack()}
      >
        <div className="container my-3">
          <p>Showing {totalCount} Customers in the database.</p>
          <div className="row my-3">
            <div className="col-3">
              <NavLink className="btn btn-primary" to="/customers/new">
                Add new Customer
              </NavLink>
            </div>
            <div className="col-9">
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
                placeholder={"Search... (name or id)"}
              />
            </div>
          </div>
          <CustomerTable
            customers={customers}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </AccessFrame>
    );
  }
}

export default Customers;
