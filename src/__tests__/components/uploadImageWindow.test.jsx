import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UploadImageWindow from "../../components/employee/uploadImageWindow";

describe("Upload Image Window", () => {
  const props = {
    id: "testID",
    update: jest.fn(),
  };

  test("should render a upload image window properly", async () => {
    user.setup();
    render(
      <>
        <button
          className="btn btn-primary my-1"
          data-toggle="modal"
          data-target="#uploadImageWindow"
        >
          Click
        </button>
        <UploadImageWindow {...props} />
      </>
    );
    const button = screen.getByRole("button", { name: "Click" });
    await user.click(button);
    const modal = screen.getByText("Upload New Image");
    expect(modal).toBeInTheDocument();
  });

  //   test("when update a image, update function should be called", async () => {
  //     user.setup();
  //     render(<UploadImageWindow {...props} />);

  //     const button = screen.getAllByRole("button", { name: "Update Image" });
  //     await user.click(button);
  //     expect(props.update).toHaveBeenCalled();
  //   });
});
