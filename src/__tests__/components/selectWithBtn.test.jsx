import { render, screen } from "@testing-library/react";
import SelectWithBtn from "../../components/common/selectWithBtn";

describe("SelectWithBtn", () => {
  const props = {
    label: "SelectWithBtn",
    options: [
      { _id: "1", name: "option1" },
      { _id: "2", name: "option2" },
    ],
  };

  test("renders SelectWithBtn component", () => {
    render(<SelectWithBtn {...props} />);
    const comboBox = screen.getByRole("combobox");
    expect(comboBox).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(props.options.length + 1);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("if there is a label, it should be displayed", () => {
    render(<SelectWithBtn {...props} />);
    const label = screen.getByText(props.label + ":");
    expect(label).toBeInTheDocument();
  });

  test("if there is a placeholder, it should be displayed", () => {
    const placeHolder = "placeHolder";
    render(<SelectWithBtn {...props} placeHolder={placeHolder} />);
    const options = screen.getAllByRole("option");
    expect(options[0]).toHaveTextContent(placeHolder);
  });

  test("if there is a error, it should be displayed", () => {
    const error = "error";
    render(<SelectWithBtn {...props} error={error} />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent(error);
  });

  test("if btnDisabled is true, button should be disabled", () => {
    render(<SelectWithBtn {...props} btnDisabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("if selectDisabled is true, select option should be disabled", () => {
    render(<SelectWithBtn {...props} selectDisabled={true} />);
    const comboBox = screen.getByRole("combobox");
    expect(comboBox).toBeDisabled();
  });
});
