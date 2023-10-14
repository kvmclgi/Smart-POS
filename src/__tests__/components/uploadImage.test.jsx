import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UploadImage from "./../../components/common/uploadImage";

describe("Upload Image", () => {
  const props = {
    setFiles: jest.fn(),
  };

  test("should render a uploadImage componenet properly", () => {
    render(
      <table>
        <UploadImage {...props} />
      </table>
    );

    const element = screen.getByText("Images:");
    expect(element).toBeInTheDocument();
  });
});
