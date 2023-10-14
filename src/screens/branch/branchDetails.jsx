import React, { useEffect, useState } from "react";

import { getBranch } from "../../services/branchService";
import { getEmployeeByBranch } from "../../services/employeeService";

const BranchDetails = ({ match }) => {
  const [branchDetails, setBranchDetails] = useState({});
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    const branch_id = match.params.id;
    try {
      const { data: branch } = await getBranch(branch_id);
      console.log(branch[0]);
      setBranchDetails(branch[0]);
      const { data: employees } = await getEmployeeByBranch(branch_id);
      setEmployees(employees);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderDetails = (label, name) => (
    <div className="row mb-2">
      <span className="col-4 text-muted">{label}:</span>
      <span className="col-8">{name}</span>
    </div>
  );

  return (
    <>
      <div className="container my-3">
        <h2>{branchDetails.branch_city} Branch Profile</h2>
      </div>
      <section className="py-1 container">
        <main className="col-lg-6 my-3">
          <div className="col my-3">
            {renderDetails("Email", branchDetails.branch_email)}
            {renderDetails("Contact", branchDetails.branch_phone)}
            {renderDetails("Address", branchDetails.branch_address)}
          </div>
        </main>
        <h5 className="col-lg-6 my-3">Employees</h5>
        <hr />
        <div className="row">
          {employees.map((employee) => (
            <div
              class="card m-2"
              style={{ paddingLeft: 0, paddingRight: 0, width: "13rem" }}
            >
              <img
                src="https://placehold.co/400x400/png"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h5 class="card-title">{employee.employee_name}</h5>
                <p class="card-text">
                  {employee.role_name}
                  <br />
                  hired on: {employee.hired_date.slice(0, 10)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BranchDetails;
