import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import EmployeeTable from "../../components/employee/employeeTable";

describe("EmployeeTable", () => {
  const props = {
    sortColumn: { path: "name", order: "asc" },
    onSort: jest.fn(),
    employees: [
      {
        id: 1,
        name: "Somesh Chandimal",
        userName: "Somesh",
        email: "slahy0@trellian.com",
        phone: "6953579061",
        branch_id: 1,
        userRole_id: 101,
      },
      {
        id: 2,
        name: "Hirushi Premarathna",
        userName: "Hirushi",
        email: "jstriker1@ameblo.jp",
        phone: "7515823058",
        branch_id: 2,
        userRole_id: 102,
      },
    ],
  };

  test("should render a EmployeeTable properly", () => {
    render(<EmployeeTable {...props} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test("should select should call onSelect", async () => {
    user.setup();
    const onSelect = jest.fn();
    render(<EmployeeTable {...props} onSelect={onSelect} />);
    const button = screen.getAllByRole("button")[0];
    await user.click(button);
    expect(onSelect).toHaveBeenCalled();
  });
});
