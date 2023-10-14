import { render, screen, logRoles } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserRoleTable from "../../components/employee/userRoleTable";

describe("UserRoleTable", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
    userRoles: [
      {
        id: 101,
        role_name: "Admin",
        description: "Admin",
      },
      {
        id: 102,
        role_name: "Manager",
        description: "Manager",
      },
    ],
  };

  test("should render a UserRoleTable properly", () => {
    render(<UserRoleTable {...props} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("when select should call onSelect", async () => {
    user.setup();
    const onSelect = jest.fn();
    render(<UserRoleTable {...props} onSelect={onSelect} />);
    const button = screen.getAllByRole("button")[0];
    await user.click(button);
    expect(onSelect).toHaveBeenCalled();
  });

  test("when delete should call onDelete", async () => {
    user.setup();
    const onDelete = jest.fn();
    render(<UserRoleTable {...props} onDelete={onDelete} />);
    const button = screen.getAllByRole("button")[1];
    await user.click(button);
    expect(onDelete).toHaveBeenCalled();
  });
});
