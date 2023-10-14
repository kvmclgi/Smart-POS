import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import SearchBox from "../components/common/searchBox";
import AccessFrame from "../components/accessFrame";
import Input from "../components/common/input";
import toast from "react-hot-toast";

import { getCategories } from "../services/categoryService";
import { getSuppliers } from "../services/supplierService";
import { getAllBranches } from "./../services/branchService";
import { getMobileAppQrURL } from "../services/imageHandler";
import {
  updateRewardsPointsPercentage,
  getRewardsPointsPercentage,
} from "./../services/orderService";

const ConfigScreen = ({ history }) => {
  const { currentUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [placeHolder] = useState("Search ...");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  // states relates to reward point
  const [rewardWindow, setRewardWindow] = useState(false);
  const [rewardPoint, setRewardPoint] = useState(0);
  const [pointChanges, setPointChanges] = useState(false);
  const [rewardPercentage, setRewardPercentage] = useState(0);

  // states relates to QR code
  const [qrCodeWindow, setQrCodeWindow] = useState(false);

  const fetchData = async () => {
    try {
      const { data: rewardPercentage } = await getRewardsPointsPercentage();
      setRewardPercentage(rewardPercentage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterData(query);
  };

  const hideAllWindows = () => {
    setShowTable(false);
    setRewardWindow(false);
    setQrCodeWindow(false);
    window.scrollTo(0, 0);
  };

  const handleClickCategoryView = async () => {
    hideAllWindows();
    setShowTable(true);
    const { data: categories } = await getCategories();
    const formatted = categories.map((c) => ({
      _id: c.category_id,
      name: c.category_name,
    }));
    setSearchQuery("");
    setData(formatted);
    setFilteredData(formatted);
  };

  const handleClickSupplierView = async () => {
    setShowTable(true);
    setRewardWindow(false);
    const { data: suppliers } = await getSuppliers();
    const formatted = suppliers.map((s) => ({
      _id: s.supplier_id,
      name: s.supplier_name,
    }));
    setSearchQuery("");
    setData(formatted);
    setFilteredData(formatted);
  };

  const handleClickBranchView = async () => {
    setShowTable(true);
    setRewardWindow(false);
    const { data: branches } = await getAllBranches();
    const formatted = branches.map((s) => ({
      _id: s.branch_id,
      name: s.branch_city,
      content: (branch) => (
        <button
          className="btn btn-danger mx-3"
          onClick={() => history.push(`/branch/${branch._id}`)}
        >
          select
        </button>
      ),
    }));
    setSearchQuery("");
    setData(formatted);
    setFilteredData(formatted);
  };

  const filterData = (query) => {
    const allData = [...data];
    let filtered = allData;
    if (query !== "")
      filtered = allData.filter((d) =>
        d.name.toLowerCase().startsWith(query.toLowerCase())
      );

    setFilteredData(filtered);
  };

  const handleRewardPointChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value < 0 || value > 100) return;
    setRewardPoint(e.target.value);
    setPointChanges(true);
  };

  const handleSaveChanges = async () => {
    try {
      const promise = updateRewardsPointsPercentage({
        rewardsPointsPercentage: rewardPoint,
      });
      toast.promise(promise, {
        pending: "Updating Rewards Points..",
        success: "Rewards Point Percentage Updated",
        error: (err) => `${err.response.data.error}`,
      });
      await promise;
      fetchData();
      // setRewardWindow(false);
    } catch (error) {
      console.error(error);
    }
  };

  const OptionFrame = ({ title, children }) => (
    <div className="card p-3 mb-3">
      <h5 className="card-title mb-3">{title}</h5>
      {children}
    </div>
  );

  const optionButton = (name, onBtnClick, onViewClick) => {
    return (
      <div className="row mb-2 mx-3">
        <button className="col btn btn-primary shadow-0" onClick={onBtnClick}>
          {name}
        </button>
        {onViewClick && (
          <button
            className="col-2 btn btn-secondary mx-3 "
            onClick={onViewClick}
          >
            {" >"}
          </button>
        )}
      </div>
    );
  };

  return (
    <AccessFrame
      accessLevel={"configuration"}
      onDenied={() => history.goBack()}
    >
      <div className="container-lg my-3">
        <div className="row">
          <div className="col-sm-5">
            {/* Branch Configuration */}
            <OptionFrame title="Branch">
              {optionButton("View Branch Details", () =>
                history.push(`/branch/${currentUser.branch_id}`)
              )}
              {optionButton(
                "Add new Branch",
                () => history.push("/branch"),
                handleClickBranchView
              )}
            </OptionFrame>
            {/* Emmployee Management*/}
            <OptionFrame title="Employee Management">
              {optionButton("View Employee Details", () =>
                history.push(`/employee`)
              )}
              {optionButton("Track Employee Working Hour", () =>
                history.push(`/employee/working`)
              )}
              {optionButton("Add new Employee", () =>
                history.push("/employee/new")
              )}
            </OptionFrame>
            {/* Inventory Management*/}
            <OptionFrame title="Inventory Management">
              {optionButton(
                "Add new Category",
                () => history.push("/inventory/categories/new"),
                handleClickCategoryView
              )}
            </OptionFrame>
            {/* Loyalty Program Management */}
            <OptionFrame title="Loyalty Program">
              {optionButton("Set Rewards Precentage", () => {
                hideAllWindows();
                setRewardWindow(!rewardWindow);
              })}
            </OptionFrame>
            {/* Suppliers Management*/}
            <OptionFrame title="Suppliers Management">
              {optionButton("View Suppliers", () => history.push("/suppliers"))}
              {optionButton(
                "Add new Supplier",
                () => history.push("/suppliers/new"),
                handleClickSupplierView
              )}
            </OptionFrame>
            {/* Access Setting */}
            <OptionFrame title="Access Rights">
              {optionButton("Edit User Roles", () =>
                history.push("/employee/roles")
              )}
            </OptionFrame>
            {/* Mobile Application */}
            <OptionFrame title="Mobile Application">
              {optionButton("Download Mobile Application", () => {
                hideAllWindows();
                setQrCodeWindow(true);
              })}
            </OptionFrame>
          </div>

          <div className="col-sm-6">
            {filteredData.length > 0 && showTable && (
              <div className="card p-3">
                <SearchBox
                  value={searchQuery}
                  placeholder={placeHolder}
                  onChange={handleSearch}
                />
                <div className="card p-3 mt-3">
                  <ul className="list-group list-group-flush">
                    {filteredData.map((data, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {data.name}
                        {data.content ? data.content(data) : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {rewardWindow && (
              <div className="card p-3">
                <h5 className="card-title mb-3">Loyalty rewards</h5>
                <p class="card-text">
                  current rewards point percentage is{" "}
                  <b>{rewardPercentage[0]?.variable_value}%</b>
                  <br />
                  set loyalty rewards point for customers
                  <br />
                  1% mean add 1% to reward point from the total bill
                </p>
                <Input
                  type="number"
                  name={"rewards"}
                  value={rewardPoint}
                  label={"Rewards Point Percentage(%)"}
                  onChange={handleRewardPointChange}
                />
                <button
                  disabled={!pointChanges}
                  className="btn btn-primary mt-3"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            )}
            {qrCodeWindow && (
              <div className="card p-3">
                <h5 className="card-title mb-3">
                  Download Smart Pos Mobile App Here
                </h5>
                <p class="card-text">
                  <b>Instruction</b>
                  <br />
                  1. Scan the QR code in your web application.
                  <br />
                  2. Tap the notification that appears on your screen..
                  <br />
                  3. Download the app from the relevant app store for your
                  mobile device..
                  <br />
                  4. Install the app on your mobile device..
                  <br />
                  5. Login to the app using your employee username and password.
                  <br />
                </p>
                <div className="rounded-4 mb-3 mt-3 d-flex justify-content-ceter">
                  <img
                    alt="display"
                    style={{ width: "70%", aspectRatio: 1, margin: "auto" }}
                    className="rounded-4 fit"
                    src={getMobileAppQrURL()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AccessFrame>
  );
};

export default ConfigScreen;
