import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Pagination from "../../components/common/pagination";

describe("Pagination", () => {
  const props = {
    itemsCount: 20,
    pageSize: 10,
    currentPage: 1,
    onPageChange: jest.fn(),
  };

  test("should render a Pagination properly", () => {
    render(<Pagination {...props} />);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const listElements = screen.getAllByRole("listitem");
    expect(listElements).toHaveLength(props.itemsCount / props.pageSize);
  });

  test("should call onPageChange when click page item", async () => {
    user.setup();
    render(<Pagination {...props} />);

    const listElements = screen.getAllByRole("listitem");
    await user.click(listElements[0]);
    expect(props.onPageChange).toHaveBeenCalled();
  });

  test("pagination should be disabled when there is only one page", () => {
    const newProps = { ...props, itemsCount: 5 };
    const element = render(<Pagination {...newProps} />);
    expect(element.container).toBeEmptyDOMElement();
  });
});
