import { render, screen } from "@testing-library/react";
import Input from "../../components/common/input";

describe("Input", () => {
  test("should render an Input properly", () => {
    const props = { name: "testName", label: "testLabel" };
    render(<Input {...props} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", props.name);

    const labelElement = screen.getByText(props.label);
    expect(labelElement).toBeInTheDocument();
  });

  test("should render an Input with an error properly", () => {
    const props = { name: "testName", label: "testLabel", error: "testError" };
    render(<Input {...props} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", props.name);

    const errorElement = screen.getByText(props.error);
    expect(errorElement).toBeInTheDocument();
  });
});
