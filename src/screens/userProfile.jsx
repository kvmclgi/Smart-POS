import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import UploadImageWindow from "../components/employee/uploadImageWindow";
import VerifyUserWindow from "../components/employee/verifyUserWindow";
import ChangePasswordWindow from "../components/employee/passwordChangeWindow";
import toast from "react-hot-toast";

import { getImageUrl } from "../services/imageHandler";
import { updateEmployeeImage } from "../services/employeeService";

const UserProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...currentUser });
  const [userVerified, setUserVerified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleImageChange = async (file) => {
    try {
      const promise = updateEmployeeImage(currentUser.employee_id, file);
      toast.promise(promise, {
        pending: "Uploading Image...",
        success: (res) =>
          res.data.success ? res.data.success : "Image Uploaded",
        error: (err) => `${err.response.data.error}`,
      });

      const { data } = await promise;
      await setCurrentUser({
        ...currentUser,
        employee_image: data.file.filename,
      });

      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = () => {
    //saving logic
    setUserVerified(false);
    setEditing(false);
  };

  const renderDetails = (label, value) => (
    <>
      <dt className="col-5">{label}:</dt>
      <dd className="col-7 mb-0">{value}</dd>
    </>
  );

  return (
    <div className="container my-3">
      <h1>User Profile</h1>
      <aside className="col-lg-4">
        <div className="profile-rounded-4 mb-3 mt-3 d-flex justify-content-ceter">
          <img
            src={getImageUrl(currentUser.employee_image)}
            alt="Profile"
            style={{
              width: "60%",
              aspectRatio: 1,
              margin: "auto",
              objectFit: "scale-down",
            }}
            className="rounded-4 fit"
          />
        </div>
      </aside>
      <div className="col-lg-6">
        <div className="row g-3 my-3">
          <div className="row my-2">
            {editing
              ? renderDetails(
                  "Username",
                  <input
                    type="text"
                    className="form-control"
                    name="employee_username"
                    value={editedUser.employee_username}
                    onChange={handleInputChange}
                  />
                )
              : renderDetails("Username", editedUser.employee_username)}
          </div>

          <div className="row my-2">
            {editing
              ? renderDetails(
                  "Name",
                  <input
                    type="text"
                    className="form-control"
                    name="employee_name"
                    value={editedUser.employee_name}
                    onChange={handleInputChange}
                  />
                )
              : renderDetails("Name", editedUser.employee_name)}
          </div>

          <div className="row my-2">
            {renderDetails("User Role", editedUser.role_name)}
          </div>

          <div className="row my-2">
            {renderDetails("Branch", editedUser.branch_name)}
          </div>

          <div className="row my-2">
            {editing
              ? renderDetails(
                  "Telephone Number",
                  <input
                    type="text"
                    className="form-control"
                    name="employee_phone"
                    value={editedUser.employee_phone}
                    onChange={handleInputChange}
                  />
                )
              : renderDetails("Telephone Number", editedUser.employee_phone)}
          </div>
        </div>

        <div className="row">
          {editing && (
            <button className="btn btn-primary my-1" onClick={handleSave}>
              Save Changes
            </button>
          )}
          {!userVerified && (
            <button
              className="btn btn-primary my-1"
              data-toggle="modal"
              data-target="#verifyUserWindow"
            >
              Edit Details
            </button>
          )}
          <button
            className="btn btn-primary my-1"
            data-toggle="modal"
            data-target="#uploadImageWindow"
          >
            Upload New Image
          </button>

          <button
            className="btn btn-primary my-1"
            data-toggle="modal"
            data-target="#changePasswordWindow"
          >
            Change Password
          </button>
        </div>
      </div>
      <VerifyUserWindow
        id={"verifyUserWindow"}
        setVerified={setUserVerified}
        // token={setToken}
        verify={() => setEditing(true)}
      />
      <ChangePasswordWindow id="changePasswordWindow" />
      <UploadImageWindow id={"uploadImageWindow"} update={handleImageChange} />
    </div>
  );
};

export default UserProfile;
