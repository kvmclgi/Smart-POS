import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SupplierTable from "../../components/supplier/supplierTable";

describe("Supplier Table", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
    suppliers: [
      {
        supplier_name: "Name",
        supplier_phone: "Contact",
        supplier_email: "Email",
        supplier_address: "Address",
      },
    ],
  };

  test("should render a Supplier Table properly", () => {
    render(<SupplierTable {...props} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("when select a supplier, onSelect event handler should be called", async () => {
    user.setup();
    const newProps = { ...props };
    newProps.onSelect = jest.fn();
    render(<SupplierTable {...newProps} />);

    const button = screen.getAllByRole("button", { name: "Select" });
    await user.click(button[0]);
    expect(newProps.onSelect).toHaveBeenCalled();
  });
});
