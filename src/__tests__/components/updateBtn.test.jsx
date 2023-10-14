import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UpdateBtn from "../../components/inventory/updateBtn";

describe("Update Button", () => {
  const props = {
    setFiles: jest.fn(),
  };

  test("should render a update button componenet properly", () => {
    render(<UpdateBtn label={"testing"} />);

    const element = screen.getByText("testing");
    expect(element).toBeInTheDocument();
  });
});
