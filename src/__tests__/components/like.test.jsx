import { render, screen } from "@testing-library/react";
import Like from "../../components/common/like";

describe("Like", () => {
  test("should render a Like properly", () => {
    render(<Like />);

    const likeElement = screen.getByTestId("like");
    expect(likeElement).toBeInTheDocument();
  });

  test("should render a Like according to given prop (empty)", () => {
    const props = { liked: false };
    render(<Like {...props} />);

    const likeElement = screen.getByTestId("like");
    expect(likeElement).toBeInTheDocument();
    expect(likeElement).toHaveClass("fa-heart-o");
  });

  test("should render a Like according to given prop (fill)", () => {
    const props = { liked: true };
    render(<Like {...props} />);

    const likeElement = screen.getByTestId("like");
    expect(likeElement).toBeInTheDocument();
    expect(likeElement).toHaveClass("fa-heart");
  });
});
