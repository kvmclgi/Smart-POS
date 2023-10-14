import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";
import AccessFrame from "../../components/accessFrame";
import UpdateBtn from "../../components/inventory/updateBtn";
import ProductImages from "../../components/inventory/productImages";
import toast from "react-hot-toast";

import { getAllBranches } from "../../services/branchService";
import { updateProductDiscount } from "../../services/productService";
import {
  getInventoryByProduct,
  updateInventory,
} from "../../services/inventoryService";

const StockUpdateForm = ({ history, match, location }) => {
  const accessLevel = "stockUpdateForm";
  const { currentUser } = useContext(UserContext);
  const [quantity, setQuantity] = useState(0);
  const [response, setResponse] = useState([]);
  const [product, setProduct] = useState({});
  const [branches, setBranches] = useState([]);

  // state relate to reorder level
  const [reorderLevel, setReorderLevel] = useState();

  // state relate to discount
  const [discount, setDiscount] = useState();

  const fetchData = async () => {
    const { data: inventory } = await getInventoryByProduct(match.params.id);
    const stock = inventory.find(
      (stock) => stock.branch_id === currentUser.branch_id
    );
    const currentBranchStock = stock
      ? stock
      : {
          branch_id: currentUser.branch_id,
          branch_name: currentUser.branch_name,
          quantity: 0,
          reorder_level: 0,
        };
    setResponse(inventory);
    setProduct(
      inventory.length === 0
        ? {
            ...location.state,
            ...currentBranchStock,
          }
        : {
            ...inventory[0],
            ...currentBranchStock,
          }
    );

    const { data: branches } = await getAllBranches();
    const filteredBranches = branches.filter(
      (branch) => branch.branch_id !== currentUser.branch_id
    );
    setBranches(filteredBranches);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setReorderLevel(product.reorder_level);
    setDiscount(product.discount);
  }, [product]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleReorderLevelChange = (e) => {
    const reorderLevel = parseInt(e.target.value);
    if (reorderLevel < 0) return;
    setReorderLevel(parseInt(e.target.value));
  };

  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value);
    if (discount < 0 || discount > parseFloat(product.retail_price)) return;
    setDiscount(discount);
  };

  const updateBtnClick = async () => {
    try {
      const promise = updateInventory({
        branch_id: currentUser.branch_id,
        product_id: product.product_id,
        quantity: product.quantity + quantity,
        reorder_level: reorderLevel,
      });
      toast.promise(promise, {
        loading: "Updating Inventory...",
        success: "Inventory Updated Successfully",
        error: (err) => `${err.response.data.error}`,
      });
      await promise;
      fetchData();
    } catch (e) {
      console.log("Error Occured", e.response);
    }
  };

  const updateDiscount = async () => {
    try {
      const promise = updateProductDiscount(
        product.product_id,
        parseFloat(discount).toFixed(2)
      );
      toast.promise(promise, {
        loading: "Updating Inventory...",
        success: "Discount Changed",
        error: (err) => `${err.response.data.error}`,
      });
      await promise;
      fetchData();
    } catch (e) {
      console.log("Error Occured", e.response);
    }
  };

  const updateStock = async () => {
    await updateBtnClick();
    return history.replace("/inventory/update");
  };

  const renderProductStockDetails = () => (
    <>
      <div className="col">
        {product.quantity > 0 ? (
          <>
            <span className="text-muted">{product.quantity} items</span>
            <span className="text-success ms-2">In stock</span>
          </>
        ) : (
          <span className="text-danger">Out of stock</span>
        )}
      </div>
      <div className="col">
        <span className="text-muted">last updated at:</span>
        <span className="text-success ms-2">
          {product.updated_on?.slice(0, 10)}
        </span>
      </div>
      <span className="text">{product.branch_name} Branch</span>
    </>
  );

  const renderDetails = (label, value) => (
    <>
      <dt className="col-5">{label}:</dt>
      <dd className="col-7">{value}</dd>
    </>
  );

  const renderStockTable = () => {
    return (
      <div className="card p-3 mt-3">
        <h5 className="card-title mb-3">Stock in other branches</h5>
        <ul className="list-group list-group-flush">
          {branches.map((branch, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {branch.branch_city}
              {response.find(
                (stock) => stock.branch_id === branch.branch_id
              ) ? (
                <span className={"badge bg-primary rounded"}>
                  {
                    response.find(
                      (stock) => stock.branch_id === branch.branch_id
                    ).quantity
                  }
                </span>
              ) : (
                <span className={"badge bg-danger rounded"}>
                  {"out of stock"}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderDetailsChangeBtn = ({
    label,
    value,
    onChange,
    onSubmit,
    btnLabel,
  }) => (
    <>
      <h6 className="card-title my-auto col">{label}</h6>
      <input
        type="number"
        className="form-control text-center border col"
        value={value}
        onChange={onChange}
      />
      <button className="btn btn-primary shadow-0 col mx-2" onClick={onSubmit}>
        {btnLabel}
      </button>
    </>
  );

  return (
    <AccessFrame accessLevel={accessLevel} onDenied={() => history.goBack()}>
      <div className="container my-3">
        <h2>Stock Update Form for {product.product_name}</h2>
      </div>
      <section className="container py-1">
        <div className="row gx-5">
          <aside className="col-lg-6 my-5">
            {ProductImages({ images: product.product_image })}
            {renderStockTable()}
          </aside>
          <main className="col-lg-6">
            <div className="ps-lg-3">
              <h4 className="title text-dark">
                {product.product_name} <br />
                <small className="text-muted">{product.category_name}</small>
              </h4>
              <div className="my-3">{renderProductStockDetails()}</div>
              <p>
                Description: <br />
                {product.product_desc}
              </p>

              <div className="row">
                {renderDetails("Buying Price", `Rs. ${product.buying_price}`)}
                {renderDetails("Retail Price", `Rs. ${product.retail_price}`)}
                {renderDetails("Discount", `Rs. ${product.discount}`)}
                {renderDetails("Reorder level", product.reorder_level)}
                {renderDetails("Supplier", product.supplier_id)}
              </div>
              <hr />
              <div className="row mb-3">
                {renderDetailsChangeBtn({
                  label: "Change Discount:",
                  value: discount,
                  onChange: handleDiscountChange,
                  onSubmit: updateDiscount,
                  btnLabel: "Change Discount",
                })}
              </div>
              <div className="row">
                {renderDetailsChangeBtn({
                  label: "Reorder Alert Level:",
                  value: reorderLevel,
                  onChange: handleReorderLevelChange,
                  onSubmit: updateBtnClick,
                  btnLabel: "Change Reorder Level",
                })}
              </div>
              <hr />
              <div className="row">
                <UpdateBtn
                  label="Add New Stock"
                  value={quantity}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleInputChange={handleQuantityChange}
                  btnLabel="Update Inventory"
                  onClick={updateStock}
                />
              </div>
            </div>
          </main>
        </div>
      </section>
    </AccessFrame>
  );
};

export default StockUpdateForm;
