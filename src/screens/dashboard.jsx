import React, { useEffect, useContext, useState } from "react";
import AccessFrame from "../components/accessFrame";

import UserContext from "./../context/UserContext";

import MonthlySaleChart from "../components/charts/monthlySaleChart";
import TopSellingBranch from "../components/charts/topSellingBranch";
import TopSellingProducts from "../components/charts/topSellingProducts";

import Select from "../components/common/select";
import { getAllBranches } from "../services/branchService";

import DashBoardTile from "../components/charts/dashboardTile";
import { MdDataExploration, MdAddShoppingCart } from "react-icons/md";
import { getMonthlySummary } from "../services/reportService";

import SaleHistoryToday from "../components/charts/saleHistoryToday";
import { getThreeMonths } from "../services/reportService";

const Dashboard = ({ history }) => {
  const { currentUser } = useContext(UserContext);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(currentUser.branch_id);
  const [monthlySummary, setMonthlySummary] = useState(null);

  const [threeMonths, setThreeMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("2023-10");

  const fetchData = async () => {
    const { data: branches } = await getAllBranches();
    const branchList = branches.map((b) => ({
      _id: b.branch_id,
      name: b.branch_city,
    }));
    setBranches(branchList);
    const { data: monthlySummary } = await getMonthlySummary();
    setMonthlySummary(monthlySummary);

    const { data: threeMonths } = await getThreeMonths();
    const monthList = threeMonths.map((m) => ({
      name: m.month_name,
    }));
    setThreeMonths(monthList);
    console.log(threeMonths);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBranchSelect = (e) => {
    setSelectedBranch(e.currentTarget.value);
  };

  const handleMonthSelect = (m) => {
    setSelectedMonth(m.currentTarget.value);
  };

  return (
    <AccessFrame
      accessLevel={"report"}
      onDenied={() => history.replace("/sale")}
      toastHidden={true}
    >
      <div className="container">
        <div className="col">
          <div className="row mb-3 p-2 rounded border">
            <h3 className="mx-3">Monthly Summary</h3>
            <div className="col">
              <DashBoardTile
                label="Gross Sale"
                decimals={2}
                value={monthlySummary ? monthlySummary[0]?.net_sale : 0}
                icon={<MdDataExploration />}
                prefix="Rs "
              />
            </div>
            <div className="col">
              <DashBoardTile
                label="Gross Profit"
                value={monthlySummary ? monthlySummary[0]?.gross_profit : 0}
                decimals={2}
                icon={<MdDataExploration />}
                prefix="Rs "
              />
            </div>
            <div className="col">
              <DashBoardTile
                label="Total Orders"
                decimals={0}
                value={monthlySummary ? monthlySummary[0]?.total_orders : 0}
                icon={<MdAddShoppingCart />}
              />
            </div>
          </div>

          <div className="row mb-3 p-2 rounded border">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="mx-3">Sales by Day</h3>
              <Select
                name={"branch"}
                value={selectedBranch}
                label={"SELECT BRANCH"}
                options={branches}
                onChange={handleBranchSelect}
                // error={errors[name]}
              />
            </div>
            <MonthlySaleChart
              height={350}
              width="100%"
              branch_id={selectedBranch}
            />
          </div>

          <div className="row">
            <div className="col p-2 rounded border">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="mx-3">Top Selling Branches</h3>
                <Select
                  name={"month"}
                  value={selectedMonth}
                  label={"Month"}
                  options={threeMonths}
                  onChange={handleMonthSelect}
                />
              </div>
              <TopSellingBranch targetMonths={selectedMonth} />
            </div>
            <div className="col p-2 rounded border">
              <h3 className="mx-3">Top Selling Products</h3>
              <div>
                {" "}
                <br></br>
              </div>
              <TopSellingProducts />
            </div>
          </div>
          <div className="row my-3 p-2 rounded border">
            <h3 className="mx-3">Sales Today on {currentUser.branch_name}</h3>
            <SaleHistoryToday branch_id={currentUser.branch_id} />
          </div>
        </div>
      </div>
    </AccessFrame>
  );
};

export default Dashboard;
