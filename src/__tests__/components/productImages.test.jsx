import { logRoles, render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import ProductImages from "./../../components/inventory/productImages";

describe("Upload Image Window", () => {
  const props = {
    images: ["dvfjnvjf"],
  };

  test("should render a upload image window properly", async () => {
    render(<ProductImages {...props} />);
    const element = screen.getByRole("img", { name: "display" });
    expect(element).toBeInTheDocument();
  });

  //   test("when update a image, update function should be called", async () => {
  //     user.setup();
  //     render(<UploadImageWindow {...props} />);

  //     const button = screen.getAllByRole("button", { name: "Update Image" });
  //     await user.click(button);
  //     expect(props.update).toHaveBeenCalled();
  //   });
});
