import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import StockTable from "../../components/inventory/stockTable";

describe("StockTable", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
    checkLowStock: jest.fn(),
    products: [
      {
        id: 1,
        name: "Muffin Chocolate Individual Wrap",
        description: "Pork - Tenderloin, Frozen",
        category: "Comedy|Drama|Romance",
        product_image: ["http://dummyimage.com/180x100.png/cc0000/ffffff"],
        weight: "1.5",
        units: "10",
        buyingPrice: "$48.67",
        retailPrice: "$8.85",
        barcode: "55154-5980",
        supplier_id: 98,
      },
      {
        id: 2,
        name: "Muffin Chocolate Individual Wrap",
        description: "Pork - Tenderloin, Frozen",
        category: "Comedy|Drama|Romance",
        product_image: ["http://dummyimage.com/180x100.png/cc0000/ffffff"],
        weight: "1.5",
        units: "10",
        buyingPrice: "$48.67",
        retailPrice: "$8.85",
        barcode: "55154-5980",
        supplier_id: 98,
      },
    ],
  };

  test("should render a StockTable properly", () => {
    render(<StockTable {...props} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("when select a product, onSelect event handler should be called", async () => {
    user.setup();
    const newProps = { ...props };
    newProps.onSelect = jest.fn();
    render(<StockTable {...newProps} />);

    const button = screen.getAllByRole("button", { name: "Select" });
    await user.click(button[0]);
    expect(newProps.onSelect).toHaveBeenCalled();
  });
});
