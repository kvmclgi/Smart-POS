import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Pagination from "../../components/common/pagination";
import { paginate } from "../../utils/paginate";
import SearchBox from "../../components/common/searchBox";
import AccessFrame from "../../components/accessFrame";
import _ from "lodash";

import SupplierTable from "../../components/supplier/supplierTable";
import { getSuppliers } from "../../services/supplierService";

class Supplier extends Component {
  state = {
    suppliers: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
    accessLevel: "supplier",
  };

  async fetchData() {
    const { data: suppliers } = await getSuppliers();
    this.setState({ suppliers });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleSelect = (supplier) => {
    return this.props.history.push("/suppliers/profile", supplier);
  };

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
      suppliers: allSuppliers,
    } = this.state;

    let filtered = allSuppliers;
    if (searchQuery)
      filtered = allSuppliers.filter(
        (m) =>
          m.supplier_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.supplier_id.toString() === searchQuery
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const employees = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: employees };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (!this.state.suppliers)
      return <p>There are no Suppliers in the database.</p>;

    const { totalCount, data: suppliers } = this.getPagedData();

    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.goBack()}
      >
        <div className="container my-3">
          <p>Showing {totalCount} Suppliers in the database.</p>
          <div className="row my-3">
            <div className="col-3">
              <NavLink className="btn btn-primary" to="/suppliers/new">
                Add new Supplier
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
          <SupplierTable
            suppliers={suppliers}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSelect={this.handleSelect}
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

export default Supplier;
