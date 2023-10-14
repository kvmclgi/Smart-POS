import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SaleCartTable from "../../components/sale/saleCartTable";
import CartContext from "../../context/CartContext";

const cartContextValue = {
  cart: [
    {
      id: 1,
      name: "Muffin Chocolate Individual Wrap",
      description: "Pork - Tenderloin, Frozen",
      category: "Comedy|Drama|Romance",
      image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
      weight: "1.5",
      units: "10",
      buyingPrice: "$48.67",
      retailPrice: "$8.85",
      barcode: "55154-5980",
      supplier_id: 98,
      quantity: 1,
    },
    {
      id: 2,
      name: "Muffin Chocolate Individual Wrap",
      description: "Pork - Tenderloin, Frozen",
      category: "Comedy|Drama|Romance",
      image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
      weight: "1.5",
      units: "10",
      buyingPrice: "$48.67",
      retailPrice: "$8.85",
      barcode: "55154-5980",
      supplier_id: 98,
      quantity: 12,
    },
  ],
  setCart: jest.fn(),
};

describe("SaleCartTable", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
  };

  test("should render a SaleCartTable properly", () => {
    render(
      <CartContext.Provider value={cartContextValue}>
        <SaleCartTable {...props} />
      </CartContext.Provider>
    );
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("when click remove, product should be remove from cart", async () => {
    user.setup();

    render(
      <CartContext.Provider value={cartContextValue}>
        <SaleCartTable {...props} />
      </CartContext.Provider>
    );

    const removeBtn = screen.getAllByTestId("remove");
    await user.click(removeBtn[0]);
    expect(cartContextValue.setCart).toHaveBeenCalledTimes(1);
  });

  test("when click increment, product should be increment from cart", async () => {
    user.setup();
    render(
      <CartContext.Provider value={cartContextValue}>
        <SaleCartTable {...props} />
      </CartContext.Provider>
    );

    const incrementBtn = screen.getAllByTestId("increment");
    await user.click(incrementBtn[0]);
    expect(cartContextValue.setCart).toHaveBeenCalledTimes(1);
  });

  test("when click decrement, product should be decrement from cart", async () => {
    user.setup();
    render(
      <CartContext.Provider value={cartContextValue}>
        <SaleCartTable {...props} />
      </CartContext.Provider>
    );

    const decrementBtn = screen.getAllByTestId("decrement");
    await user.click(decrementBtn[0]);
    expect(cartContextValue.setCart).toHaveBeenCalledTimes(1);
  });
});
