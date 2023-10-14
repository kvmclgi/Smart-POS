import { render, screen } from "@testing-library/react";
import { MdAddShoppingCart } from "react-icons/md";
import DashBoardTile from "../../components/charts/dashboardTile";

describe("Dashboard Tile", () => {
  const props = { label: "testLabel", icon: <MdAddShoppingCart /> };
  test("should render an Tile properly", () => {
    render(<DashBoardTile {...props} />);

    const labelElement = screen.getByText(props.label);
    expect(labelElement).toBeInTheDocument();
  });
});
