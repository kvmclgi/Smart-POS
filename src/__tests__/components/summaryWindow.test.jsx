import { render, screen } from "@testing-library/react";
import SummaryWindow from "../../components/sale/summaryWindow";

describe("SummaryWindow", () => {
  const props = {
    id: "popUpWindow",
    paymentMethod: "cash",
    cashierName: "cashierName",
    quantity: "quantity",
    discount: "discount",
    totalPrice: "totalPrice",
    paymentDetails: "paymentDetails",
    placeOrder: jest.fn(),
  };

  test("should render a SummaryWindow properly", async () => {
    render(<SummaryWindow {...props} />);
    const modal = screen.getAllByText(/confirm/i)[0];
    expect(modal).toBeInTheDocument();
  });

  test("if payment method is cash, then changes should be displayed", async () => {
    render(<SummaryWindow {...props} />);
    const paymentMethod = screen.getByText(/cash given:/i);
    expect(paymentMethod).toBeInTheDocument();
  });
});
