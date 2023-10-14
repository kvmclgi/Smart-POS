import React, { useEffect, useState } from "react";
import SelectWithBtn from "../../components/common/selectWithBtn";
import AccessFrame from "./../../components/accessFrame";
import toast from "react-hot-toast";

import { getUserRoles } from "../../services/authorizationService";
import { getAllBranches } from "../../services/branchService";
import { updateEmployee } from "../../services/employeeService";
import { getImageUrl } from "./../../services/imageHandler";

const EmployeeProfile = ({ history, location }) => {
  const [employee, setEmployee] = useState({});
  const [userRoles, setUserRoles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branch, setBranch] = useState(null);
  const [role, setRole] = useState(null);

  const fetchData = async () => {
    const { data: roles } = await getUserRoles();
    const { data: branch } = await getAllBranches();
    setUserRoles(
      roles.map((role) => ({ _id: role.role_id, name: role.role_name }))
    );
    setBranches(branch.map((b) => ({ _id: b.branch_id, name: b.branch_city })));
  };

  useEffect(() => {
    if (!location.state) return history.replace("/employee");
    setEmployee(location.state);
    fetchData();
  }, [history, location.state]);

  const saveChanges = async () => {
    try {
      const promise = updateEmployee(employee.employee_id, {
        employee_name: employee.employee_name,
        employee_email: employee.employee_email,
        employee_phone: employee.employee_phone,
        role_id: role ? role : employee.role_id,
        branch_id: branch ? branch : employee.branch_id,
      });
      toast.promise(promise, {
        loading: "updating employee...",
        success: "Employee updated",
        error: "Error Occured",
      });
      await promise;
      return history.goBack();
    } catch (e) {
      console.log("Error Occured");
      console.log(e.response.data);
      // this.setState({ errors: { ...e.response.data.error } });
    }
  };

  const renderDetails = (label, name) => (
    <div className="row mb-2">
      <span className="col-4 text-muted">{label}:</span>
      <span className="col-8">{name}</span>
    </div>
  );

  return (
    <AccessFrame
      accessLevel={"employeeDetails"}
      onDenied={() => history.goBack()}
    >
      <div className="container my-3">
        <h2>Employee Profile</h2>
      </div>
      <section className="py-1">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-4">
              <div className="rounded-4 mb-3 mt-3 d-flex justify-content-ceter">
                <img
                  alt="display"
                  style={{ width: "60%", aspectRatio: 1, margin: "auto" }}
                  className="rounded-4 fit"
                  src={
                    employee.employee_image
                      ? getImageUrl(employee.employee_image)
                      : "https://placehold.co/400x400/png"
                  }
                />
              </div>
            </aside>

            <main className="col-lg-6 my-3">
              <h4 className="title text-dark">
                {employee.employee_name} <br />
                <small className="text-muted">{employee.role_name}</small>
              </h4>
              <div className="col my-3">
                {renderDetails("Assigned Branch", employee.branch_name)}
                {renderDetails("Email", employee.employee_email)}
                {renderDetails("Contact", employee.employee_phone)}
              </div>
              <hr />
              <SelectWithBtn
                name={"branch"}
                label="Assigned New Branch"
                value={branch}
                placeHolder="Select Branch"
                options={branches}
                btnDisabled={!branch}
                onChange={(e) => {
                  setBranch(e.currentTarget.value);
                }}
                onClick={saveChanges}
              />
              <SelectWithBtn
                name={"role"}
                value={role}
                label="Change User Role"
                placeHolder="Select User Role"
                options={userRoles}
                btnDisabled={!role}
                onChange={(e) => {
                  setRole(e.currentTarget.value);
                }}
                onClick={saveChanges}
              />
            </main>
          </div>
        </div>
      </section>
    </AccessFrame>
  );
};

export default EmployeeProfile;
