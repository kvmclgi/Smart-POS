import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import ProductTable from "../../components/inventory/productTable";

describe("ProductTable", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
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

  test("should render a ProductTable properly", () => {
    render(<ProductTable {...props} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("when delete a product, onDelete event handler should be called", async () => {
    user.setup();
    const newProps = { ...props };
    newProps.onDelete = jest.fn();
    render(<ProductTable {...newProps} />);

    const button = screen.getAllByRole("button", { name: "Delete" });
    await user.click(button[0]);
    expect(newProps.onDelete).toHaveBeenCalled();
  });
});
