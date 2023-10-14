import React, { useEffect, useState } from "react";
import SearchBox from "../../components/common/searchBox";
import UserRoleTable from "./../../components/employee/userRoleTable";
import Input from "../../components/common/input";
import toast from "react-hot-toast";
import _ from "lodash";

import {
  getUserRoles,
  accessList,
  changeUserAccess,
  deleteUserRole,
  addNewUserRole,
} from "../../services/authorizationService";

const UserRoles = () => {
  const [accessLevels, setAccessLevels] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // filtered User role according to search query
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState({
    path: "role_name",
    order: "asc",
  });
  const [selectedRole, setSelectedRole] = useState({});
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [isSettingChanged, setIsSettingChanged] = useState(false);

  // states that belongs to user role form
  const [showForm, setShowForm] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDesc, setNewRoleDesc] = useState("");

  const fetchData = async () => {
    const { data: roles } = await getUserRoles();
    const access = accessList();
    setUserRoles(roles);
    setFilteredData(roles);
    setAccessLevels(access);
    setNewRoleName("");
    setNewRoleDesc("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
    const sortedList = _.orderBy(
      userRoles,
      [sortColumn.path],
      [sortColumn.order]
    );
    setFilteredData(sortedList);
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setSelectedAccess(role.user_access);
    setShowForm(false);
  };

  const handleRoleDelete = async (role) => {
    try {
      const { data } = await deleteUserRole(role.role_id);
      fetchData();
      console.log(data.result);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.error);
    }
  };

  const handleAccessSelect = (access) => {
    const index = selectedAccess.indexOf(access);
    if (index > -1) {
      const newAccess = [...selectedAccess];
      newAccess.splice(index, 1);
      setSelectedAccess(newAccess);
    } else {
      const newAccess = [...selectedAccess];
      newAccess.push(access);
      setSelectedAccess(newAccess);
    }
    setIsSettingChanged(true);
  };

  const filterData = (query) => {
    const allData = [...userRoles];
    let filtered = allData;
    if (query !== "")
      filtered = allData.filter((d) =>
        d.role_name.toLowerCase().startsWith(query.toLowerCase())
      );
    setFilteredData(filtered);
  };

  const handleSaveChanges = async () => {
    if (showForm) {
      try {
        await addNewUserRole({
          role_name: newRoleName,
          role_desc: newRoleDesc,
          user_access: selectedAccess,
        });
        fetchData();
        setShowForm(false);
        setSelectedRole({});
        setSelectedAccess([]);
        toast.success("New User Role Added");
      } catch (e) {
        console.log(e.response);
      }
    } else {
      try {
        await changeUserAccess(selectedRole.role_id, selectedAccess);
        const newRoles = [...userRoles];
        const index = newRoles.indexOf(selectedRole);
        newRoles[index].user_access = selectedAccess;
        setUserRoles(newRoles);
        setSelectedRole(newRoles[index]);
        setIsSettingChanged(false);
        return alert("Changes Saved");
      } catch (e) {
        console.log("Error Occured");
        console.log(e.response.data);
      }
    }
  };

  const newUserRoleForm = () => (
    <>
      <h5 className="card-title mb-3">Create New User Role</h5>
      <Input
        name={"role_name"}
        label={"User Role Name"}
        value={newRoleName}
        onChange={(e) => setNewRoleName(e.currentTarget.value)}
      />
      <div className="my-2" />
      <Input
        name={"role_desc"}
        label={"Description"}
        value={newRoleDesc}
        onChange={(e) => setNewRoleDesc(e.currentTarget.value)}
      />
      <div className="my-2" />
    </>
  );
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-5">
          <button
            className="btn btn-primary mx-2"
            style={{ width: "95%" }}
            onClick={() => {
              setSelectedAccess([]);
              setShowForm(true);
            }}
          >
            Create New User Role
          </button>
          <hr />
          <div className="card p-3">
            <SearchBox
              value={searchQuery}
              placeholder="Search..."
              onChange={handleSearch}
            />
            <UserRoleTable
              userRoles={filteredData}
              sortColumn={sortColumn}
              onSort={handleSort}
              onSelect={handleRoleSelect}
              onDelete={handleRoleDelete}
            />
          </div>
        </div>

        <div className="col-6">
          <div className="card p-3 mb-3">
            {!showForm ? (
              <>
                <h5 className="card-title mb-3">
                  {selectedRole.role_name
                    ? selectedRole.role_name
                    : "Select UserRole"}
                </h5>
                {selectedRole.role_desc && (
                  <h6 className="card-body">{selectedRole.role_desc}</h6>
                )}
              </>
            ) : (
              newUserRoleForm()
            )}
            <ul className="list-group list-group-flush">
              {accessLevels.map((access) => (
                <li
                  className="form-check list-group-item"
                  key={access.access_type_id}
                >
                  <input
                    className="form-check-input mx-1"
                    type="checkbox"
                    value=""
                    onChange={handleAccessSelect.bind(
                      this,
                      access.access_type_id
                    )}
                    checked={selectedAccess.includes(access.access_type_id)}
                  />
                  <label
                    className="form-check-label mx-3"
                    htmlFor="flexCheckChecked"
                  >
                    {access.access_name}
                  </label>
                </li>
              ))}
            </ul>
            <button
              className="btn btn-primary mt-3"
              disabled={!isSettingChanged}
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;
