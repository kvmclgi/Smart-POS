import { render, screen } from "@testing-library/react";
import Form from "../../components/common/form";

describe("Form", () => {
  const form = new Form();
  test("should render a Select properly", () => {
    const props = {
      name: "name",
      label: "label",
      options: ["option1", "option2"],
    };

    const selectView = render(
      form.renderSelect(props.name, props.label, props.options)
    );
    expect(selectView.getByRole("combobox")).toBeInTheDocument();
    const options = selectView.getAllByRole("option");
    expect(options).toHaveLength(props.options.length + 1);
  });

  test("should render a Button properly", () => {
    const props = {
      label: "cancel",
    };

    render(form.renderButton(props.label));
    const btnElement = screen.getByRole("button");
    expect(btnElement).toBeInTheDocument();
    expect(btnElement).toHaveTextContent(props.label);
  });

  test("should render an Input properly", () => {
    const props = {
      name: "testName",
      label: "testLabel",
    };

    render(form.renderInput(props.name, props.label));

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", props.name);
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("value", "");

    const labelElement = screen.getByText(props.label);
    expect(labelElement).toBeInTheDocument();
  });
});
