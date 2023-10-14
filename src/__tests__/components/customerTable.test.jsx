import { render, screen } from "@testing-library/react";
import CustomerTable from "../../components/customer/customerTable";

describe("CustomerTable", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
    customers: [
      {
        _id: "5b21ca3eeb7f6fbccd471815",
        name: "John Smith",
        contact: "1234567890",
        visitCount: 5,
        totalSpent: 100,
        pointCount: 100,
      },
      {
        _id: "5b21ca3eeb7f6fbccd471816",

        name: "Jane Doe",
        contact: "1234567890",
        visitCount: 5,
        totalSpent: 100,
        pointCount: 100,
      },
    ],
  };

  test("should render a CustomerTable properly", () => {
    render(<CustomerTable {...props} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});
