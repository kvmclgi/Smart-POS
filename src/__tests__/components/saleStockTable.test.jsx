import { render, screen } from "@testing-library/react";
import SaleStockTable from "../../components/sale/saleStockTable";

describe("SaleStockTable", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
    products: [
      {
        id: 1,
        name: "Muffin Chocolate Individual Wrap",
        description: "Pork - Tenderloin, Frozen",
        category: "Comedy|Drama|Romance",
        image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
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
        image: "http://dummyimage.com/180x100.png/cc0000/ffffff",
        buyingPrice: "$48.67",
        retailPrice: "$8.85",
        barcode: "55154-5980",
        supplier_id: 98,
      },
    ],
  };

  test("should render a SaleStockTable properly", () => {
    render(<SaleStockTable {...props} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("when select a product, onSelect event handler should be called", async () => {
    const newProps = { ...props };
    newProps.onSelect = jest.fn();
    render(<SaleStockTable {...newProps} />);

    const button = screen.getAllByRole("button");
    await button[0].click();
    expect(newProps.onSelect).toHaveBeenCalled();
  });
});
