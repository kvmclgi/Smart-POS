import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { paginate } from "../../utils/paginate";
import Pagination from "../../components/common/pagination";
import ProductTable from "../../components/inventory/productTable";
import SearchBox from "../../components/common/searchBox";
import AccessFrame from "./../../components/accessFrame";
import toast from "react-hot-toast";
import _ from "lodash";

import {
  deleteProduct,
  getProductWithCategory,
} from "../../services/productService";

class ProductCatalog extends Component {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 20,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
    accessLevel: "productCatalog",
  };

  fetchProducts = async () => {
    const { data: products } = await getProductWithCategory();
    const availableProducts = products.filter((product) => !product.removed);
    this.setState({ products: availableProducts });
  };

  componentDidMount() {
    this.fetchProducts();
  }

  handleDelete = async (product_id) => {
    try {
      const promise = deleteProduct(product_id);
      toast.promise(promise, {
        pending: "Deleting Product...",
        success: "Product Deleted",
        error: (err) => `${err.response.data.error}`,
      });
      console.log(promise);
      await promise;
      this.fetchProducts();
      this.handleSearch("");
    } catch (e) {
      console.log(e);
    }
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
    } = this.state;

    let filtered = allProducts;

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
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

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
            <div className="col-3">
              <NavLink className="btn btn-primary" to="/inventory/new">
                Add new Product
              </NavLink>
            </div>
            <div className="col-9">
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
                placeholder={"Search... (name or barcode)"}
              />
            </div>
          </div>
          <ProductTable
            products={products}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
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

export default ProductCatalog;
