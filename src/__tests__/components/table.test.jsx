import { screen, render } from "@testing-library/react";
import Table from "../../components/common/table";

describe("Table", () => {
  const props = {
    columns: [{ path: "title", label: "Title" }],
    sortColumn: { path: "title", order: "asc" },
    onSort: jest.fn(),
    data: [
      {
        _id: "5b21ca3eeb7f6fbccd471815",
        title: "Terminator",
      },
      {
        _id: "5b21ca3eeb7f6fbccd471816",
        title: "Die Hard",
      },
      {
        _id: "5b21ca3eeb7f6fbccd471817",
        title: "Get Out",
      },
    ],
  };

  test("renders Table component", () => {
    const table = render(<Table {...props} />);
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
  });
});
