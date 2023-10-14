import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SearchBox from "../../components/common/searchBox";

describe("SearchBox", () => {
  test("should render a search box", () => {
    render(<SearchBox />);
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toBeInTheDocument();
  });

  test("should render a search box with the given value", () => {
    render(<SearchBox value="test" />);
    const element = screen.getByRole("textbox");
    expect(element).toHaveValue("test");
  });

  test("should call onChange event handler when the value changes", async () => {
    user.setup();
    const handleChange = jest.fn();
    render(<SearchBox onChange={handleChange} />);

    const searchBox = screen.getByRole("textbox");
    await user.type(searchBox, "test");
    expect(handleChange).toHaveBeenCalled();
  });
});
