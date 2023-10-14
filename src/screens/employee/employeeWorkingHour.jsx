import React, { useContext, useEffect, useState } from "react";
import UserContext from "./../../context/UserContext";
import Table from "../../components/common/table";
import Input from "./../../components/common/input";
import moment from "moment/moment";
import toast from "react-hot-toast";
import _ from "lodash";

import {
  getEmployeeByBranch,
  addEmployeeRecord,
  getRecordByDateBranch,
} from "./../../services/employeeService";

const recordTableColumn = [
  { path: "employee_id", label: "ID" },
  { path: "employee_name", label: "Name" },
  { path: "role_name", label: "Role" },
  { path: "shift_on", label: "Shift On" },
  { path: "shift_off", label: "Shift Off" },
  { path: "total_hours", label: "Total Hours" },
];

const EmployeeWorkingHour = () => {
  const { currentUser } = useContext(UserContext);
  const [markEmployees, setMarkEmployees] = useState([]);
  const [unmarkEmployees, setUnmarkEmployees] = useState([]);
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });

  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );

  // Table Column
  const employeeTableColumn = [
    { path: "employee_id", label: "ID" },
    { path: "employee_name", label: "Name" },
    { path: "role_name", label: "Role" },
    {
      key: "on",
      label: "Shift On",
      content: (employee) => (
        <input
          className="form-group form-control"
          label=""
          name={"date"}
          value={employee.shift_on}
          type="time"
          onChange={(e) =>
            handleTimeSelect("shift_on", e.currentTarget, employee)
          }
        />
      ),
    },
    {
      key: "off",
      label: "Shift Off",
      content: (employee) => (
        <input
          className="form-group form-control"
          label=""
          name={"date"}
          value={employee.shift_off}
          type="time"
          onChange={(e) =>
            handleTimeSelect("shift_off", e.currentTarget, employee)
          }
        />
      ),
    },
    {
      key: "leave",
      label: "Leave",
      content: (employee) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => submitLeaveRecord(employee)}
        >
          Leave
        </button>
      ),
    },
    {
      key: "save",
      content: (employee) => (
        <button
          className="btn btn-primary btn-sm"
          disabled={!validateRecord(employee)}
          onClick={() => submitRecord(employee)}
        >
          Save
        </button>
      ),
    },
  ];

  const fetchData = async () => {
    const { data: employees } = await getEmployeeByBranch(
      currentUser.branch_id
    );
    const { data: markedEmp } = await getRecordByDateBranch(
      selectedDate,
      currentUser.branch_id
    );
    const unmarkEmp = employees.filter(
      (e) => !markedEmp.find((emp) => emp.employee_id === e.employee_id)
    );
    //remove owners from employee list
    setUnmarkEmployees(
      unmarkEmp
        .filter((employee) => employee.role_id !== 1)
        .map((emp) => mapToViewModel(emp))
    );
    setMarkEmployees(markedEmp);
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const mapToViewModel = (employee) => ({
    ...employee,
    shift_on: "",
    shift_off: "",
    total_hours: 0,
    present: true,
    updated_by: currentUser.employee_id,
    date: selectedDate,
  });

  const mapToDataModel = (employee) => ({
    employee_id: employee.employee_id,
    employee_name: employee.employee_name,
    role_name: employee.role_name,
    date: employee.date,
    shift_on: employee.shift_on,
    shift_off: employee.shift_off,
    updated_by: employee.updated_by,
    present: employee.present,
    total_hours: employee.total_hours,
  });

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    const sortedEmployees = _.orderBy(
      unmarkEmployees,
      [sortColumn.path],
      [sortColumn.order]
    );
    setUnmarkEmployees(sortedEmployees);
  };

  const handleDateSelect = (e) => {
    const userSelectedDate = moment(e.currentTarget.value);
    const currentDate = moment();

    if (userSelectedDate.isAfter(currentDate)) {
      toast.error(
        "Updating employee working hours for a future date is not allowed."
      );
    } else if (userSelectedDate.isBefore(currentDate)) {
      setSelectedDate(e.currentTarget.value);
    } else {
      toast.error("Please select a valid date.");
    }
  };

  const getTotalHours = (shift_on, shift_off) => {
    // Get the hours and minutes from the start and end time.
    const startHour = parseInt(shift_on.slice(0, 2));
    const startMinute = parseInt(shift_on.slice(3, 5));
    const endHour = parseInt(shift_off.slice(0, 2));
    const endMinute = parseInt(shift_off.slice(3, 5));
    // // Calculate the total hours in decimal format.
    return parseFloat(
      endHour - startHour + (endMinute - startMinute) / 60
    ).toFixed(2);
  };

  const handleTimeSelect = (path, time, employee) => {
    let employees = [...unmarkEmployees];
    const index = employees.indexOf(employee);
    employees[index][path] = time.value;
    setUnmarkEmployees(employees);
  };

  const validateRecord = (employee) => {
    if (employee.shift_on === "" || employee.shift_off === "") return false;
    else
      return getTotalHours(employee.shift_on, employee.shift_off) < 0
        ? false
        : true;
  };

  const submitLeaveRecord = async (employee) => {
    try {
      const employeeDetails = {
        ...employee,
        present: false,
        shift_on: "00:00",
        shift_off: "00:00",
      };
      const promise = addEmployeeRecord(mapToDataModel(employeeDetails));
      toast.promise(promise, {
        pending: "Adding Record...",
        success: "Record Added.",
        error: "Error",
      });
      await promise;
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const submitRecord = async (employee) => {
    if (!validateRecord(employee))
      return toast.error("Validation Error. Check Shift_On < Off");
    const employeeDetails = {
      ...employee,
      total_hours: getTotalHours(employee.shift_on, employee.shift_off),
    };
    await addEmployeeRecord(mapToDataModel(employeeDetails));
    fetchData();
  };

  return (
    <div className="container">
      <h2 className="mt-2">Record Employee Working Hours</h2>

      <div className="card p-2 rounded my-3">
        <div className="row justify-content-between">
          <h4 className="card-title col-5 align-self-center mx-2">
            {currentUser.branch_name} branch
          </h4>
          <div className="col-3">
            <Input
              label={"Date"}
              name={"date"}
              value={selectedDate}
              type="date"
              onChange={handleDateSelect}
            />
          </div>
        </div>
        {unmarkEmployees.length > 0 ? (
          <Table
            data={unmarkEmployees}
            columns={employeeTableColumn}
            sortColumn={sortColumn}
            onSort={handleSort}
          />
        ) : (
          <p className="mx-2">
            All Employee Records are recorded.
            <br />
            Check Below
          </p>
        )}
      </div>
      <div className="card p-2 rounded">
        <h4 className="card-title mx-2">
          Working Hour Recorded Employees on {selectedDate}
        </h4>
        <Table
          columns={recordTableColumn}
          sortColumn={sortColumn}
          onSort={handleSort}
          data={markEmployees}
        />
      </div>
    </div>
  );
};

export default EmployeeWorkingHour;
