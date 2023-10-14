import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getTopBranches } from "../../services/reportService";

const TopSellingBranch = ({ targetMonths }) => {
  const [salesData, setSalesData] = useState([]);
  const [branchNames, setBranchNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const chartOptions = {
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: "bar",
      stacked: false,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: branchNames,
      title: {
        text: "Branch",
      },
    },
    yaxis: {
      title: {
        text: "Sales (Rs.)",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#0090FF", "#FEB019", "#00E396"],

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.7,
        opacityTo: 0.8,
      },
      colors: ["#0090FF", "#FEB019", "#00E396"],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "Rs " + parseFloat(val).toFixed(2);
        },
      },
    },
  };

  async function fetchSalesData(targetMonths) {
    try {
      const response = await getTopBranches(targetMonths);
      const data = response.data;

      const extractedBranchNames = data.map((item) => item.branch_name);
      const currentMonthSales = data.map((item) =>
        parseFloat(item.current_month_sales)
      );
      const previousMonthSales = data.map((item) =>
        parseFloat(item.previous_month_sales)
      );

      setBranchNames(extractedBranchNames);
      setSalesData([
        {
          name: "Current Month Sales",
          data: currentMonthSales,
        },
        {
          name: "Previous Month Sales",
          data: previousMonthSales,
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchSalesData(targetMonths);
  }, [targetMonths]);

  if (loading) return <div>Loading...</div>;

  return (
    <Chart options={chartOptions} series={salesData} type="bar" height={250} />
  );
};

export default TopSellingBranch;
