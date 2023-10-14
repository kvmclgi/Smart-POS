import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { paginate } from "../../utils/paginate";
import Pagination from "../../components/common/pagination";
import SearchBox from "../../components/common/searchBox";
import StockTable from "../../components/inventory/stockTable";
import AccessFrame from "../../components/accessFrame";
import _ from "lodash";

import { getInventoryByBranch } from "../../services/inventoryService";
import { getProducts } from "../../services/productService";

class UpdateInventory extends Component {
  state = {
    products: [],
    lowStock: [],
    showLowStock: false,
    currentPage: 1,
    pageSize: 20,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
    accessLevel: "inventory",
    user: {},
  };

  checkLowStock = (product) =>
    parseInt(product.reorder_level) > parseInt(product.quantity) ||
    parseInt(product.quantity) === 0;

  fetchData = async () => {
    const { data: inventory } = await getInventoryByBranch(1);
    const { data: products } = await getProducts();
    const availableProducts = products.filter((product) => !product.removed);
    const updatedInventory = availableProducts.map((product) => {
      const stock = inventory.find(
        (item) => item.product_id === product.product_id
      );
      return {
        ...product,
        quantity: stock ? stock.quantity : "0",
        updated_on: stock ? stock.updated_on.slice(0, 10) : "never",
        reorder_level: stock ? stock.reorder_level : undefined,
      };
    });
    this.setState({ products: [...updatedInventory] });
  };

  filterLowStock = () => {
    const { products } = this.state;
    const lowStock = products.filter(this.checkLowStock);
    this.setState({ lowStock });
  };

  async componentDidMount() {
    await this.fetchData();
    this.filterLowStock();
  }

  handleSelect = (product) => {
    this.props.history.push(`/inventory/update/${product.product_id}`, product);
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
      products: allProducts,
      lowStock,
    } = this.state;

    let filtered = this.state.showLowStock ? lowStock : allProducts;

    if (searchQuery)
      filtered = allProducts.filter(
        (m) =>
          m.product_name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
          m.product_barcode.startsWith(searchQuery)
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const Products = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: Products };
  };

  render() {
    const { length: count } = this.state.products;
    const { pageSize, currentPage, sortColumn, searchQuery, showLowStock } =
      this.state;

    if (count === 0) return <p>There are no Products in the database.</p>;

    const { totalCount, data: products } = this.getPagedData();

    return (
      <AccessFrame
        accessLevel={this.state.accessLevel}
        onDenied={() => this.props.history.goBack()}
      >
        <div className="container my-3">
          <p>Showing {totalCount} Products in the database.</p>
          <div className="row my-3">
            <div className="col-8">
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
                placeholder={"Search... (name or barcode)"}
              />
            </div>

            <NavLink className="col btn btn-primary mx-2" to="/inventory/new">
              Add new Product
            </NavLink>

            <button
              className="col btn btn-secondary position-relative"
              onClick={() => this.setState({ showLowStock: !showLowStock })}
            >
              {showLowStock ? "Show All Products" : "Low Stock Alert"}
              {!showLowStock && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {this.state.lowStock.length}
                </span>
              )}
            </button>
          </div>
          <StockTable
            products={products}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSelect={this.handleSelect}
            onSort={this.handleSort}
            checkLowStock={this.checkLowStock}
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

export default UpdateInventory;
