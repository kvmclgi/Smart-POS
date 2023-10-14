import { render, screen } from "@testing-library/react";
import Select from "../../components/common/select";

describe("Select", () => {
  const props = {
    name: "test",
    label: "test",
    options: [
      { _id: 1, name: "item1" },
      { _id: 2, name: "item2" },
    ],
    error: "",
  };

  test("should render a Select properly", () => {
    render(<Select {...props} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(props.options.length + 1);
  });

  test("should render a Select properly with error", () => {
    const propsWithError = { ...props, error: "error" };
    render(<Select {...propsWithError} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(props.options.length + 1);

    const error = screen.getByRole("alert");
    expect(error).toBeInTheDocument();
  });
});
