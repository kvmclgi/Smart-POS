import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import TableHeader from "../../components/common/tableHeader";

describe("TableHeader", () => {
  const props = {
    columns: [
      { path: "test1", label: "test1" },
      { path: "test2", label: "test2" },
    ],
    sortColumn: { path: "test1", order: "asc" },
    onSort: jest.fn(),
  };

  test("should render a TableHeader properly", () => {
    render(
      <table>
        <TableHeader {...props} />
      </table>
    );

    const tableHeader = screen.getByRole("row");
    expect(tableHeader).toBeInTheDocument();

    const tableHeaderCells = screen.getAllByRole("columnheader");
    expect(tableHeaderCells).toHaveLength(props.columns.length);
  });

  test("when click on table header, onSort should be called", async () => {
    user.setup();
    render(
      <table>
        <TableHeader {...props} />
      </table>
    );

    const tableHeaderCells = screen.getAllByTestId("table-header");
    await user.click(tableHeaderCells[0]);
    expect(props.onSort).toHaveBeenCalledTimes(1);
  });
});
