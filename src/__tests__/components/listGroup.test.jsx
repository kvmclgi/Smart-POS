import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import ListGroup from "../../components/common/listGroup";

describe("ListGroup", () => {
  const props = {
    items: [
      { _id: 1, name: "item1" },
      { _id: 2, name: "item2" },
    ],
    textProperty: "name",
    valueProperty: "_id",
    selectedItem: {},
    onItemSelect: jest.fn(),
  };

  test("should render a ListGroup properly", () => {
    render(<ListGroup {...props} />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listElements = screen.getAllByRole("listitem");
    expect(listElements).toHaveLength(props.items.length);
  });

  test("when click item, should call onItemSelect", async () => {
    user.setup();
    render(<ListGroup {...props} />);

    const listElements = screen.getAllByRole("listitem");
    await user.click(listElements[0]);
    expect(props.onItemSelect).toHaveBeenCalled();
  });

  test("should highlight the selected item", () => {
    const selectedItem = props.items[0];
    render(<ListGroup {...props} selectedItem={selectedItem} />);

    const listElements = screen.getAllByRole("listitem");
    expect(listElements[0]).toHaveClass("active");
  });
});
