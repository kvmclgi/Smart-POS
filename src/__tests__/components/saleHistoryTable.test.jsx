import { render, screen } from "@testing-library/react";
import SaleHistoryTable from "../../components/sale/saleHistoryTable";

describe("Sale History Table", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
    salesToday: [
      {
        order_id: 1,
        customer: "Customer",
        cashier_name: "Cashier",
        payment_method: "Payment Method",
        created_time: "Time(HH:MM:SS)",
        total: "Total(Rs.)",
        total_quantity: "Quantity",
      },
    ],
  };

  test("should render a Sale History Table properly", () => {
    render(<SaleHistoryTable {...props} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});
