import { render, screen } from "@testing-library/react";
import TableBody from "../../components/common/tableBody";

describe("TableBody", () => {
  const props = {
    data: [
      { _id: 1, name: "item1" },
      { _id: 2, name: "item2" },
    ],
    columns: [
      { path: "name", label: "Name" },
      // { key: "delete", content: (item) => <button>Delete</button> },
    ],
  };

  test("should render a TableBody properly", () => {
    render(
      <table>
        <TableBody {...props} />
      </table>
    );

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(props.data.length);

    const cells = screen.getAllByRole("cell");
    expect(cells).toHaveLength(props.data.length * props.columns.length);
  });
});
