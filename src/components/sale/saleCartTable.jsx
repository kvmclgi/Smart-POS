import React, { useContext } from "react";
import Table from "../common/table";
import CartContext from "../../context/CartContext";

const SaleCartTable = ({ onSort, sortColumn }) => {
  const { cart, setCart } = useContext(CartContext);

  const handleCartProductIncrement = (product) => {
    const cartCopy = [...cart];
    const index = cartCopy.indexOf(product);
    cartCopy[index] = { ...product, quantity: product.quantity + 1 };
    setCart(cartCopy);
  };

  const handleCartProductDecrement = (product) => {
    const cartCopy = [...cart];
    const index = cartCopy.indexOf(product);
    cartCopy[index] = { ...product, quantity: product.quantity - 1 };
    setCart(cartCopy);
  };

  const onRemoveFromCart = (product) => {
    const cartCopy = [...cart];
    const index = cartCopy.indexOf(product);
    cartCopy.splice(index, 1);
    setCart(cartCopy);
  };

  const columns = [
    { path: "product_barcode", label: "Barcode" },
    {
      path: "product_name",
      label: "Name",
    },
    { path: "retail_price", label: "Retail Price" },
    {
      key: "quantity",
      label: "Quantity",
      content: (product) => (
        <div className="input-group mb-3" style={{ width: 150 }}>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              data-testid="decrement"
              className="btn btn-outline-primary"
              onClick={() => handleCartProductDecrement(product)}
            >
              -
            </button>
            <input
              type="text"
              className="form-control text-center border "
              value={product.quantity}
              readOnly
            />
            <button
              type="button"
              data-testid="increment"
              className="btn btn-outline-primary"
              onClick={() => handleCartProductIncrement(product)}
            >
              +
            </button>
          </div>
        </div>
        // <input type="number" min="1" className="form-control border" />
      ),
    },
    {
      key: "total",
      label: "Total",
      content: (product) =>
        `Rs. ${parseFloat(
          (product.quantity * product.retail_price).toFixed(2)
        )}`,
    },
    {
      key: "delete",
      label: "Remove",
      content: (product) => (
        <button
          onClick={() => onRemoveFromCart(product)}
          className="btn btn-danger btn-sm"
          data-testid="remove"
        >
          Remove
        </button>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      data={cart.slice().reverse()}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default SaleCartTable;
