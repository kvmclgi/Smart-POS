import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getTopSellingProducts } from "../../services/reportService";

const TopSellingBranch = ({ targetMonths }) => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [productNames, setProductNames] = useState([]);

  const chartOptions = {
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: true,
    },
    chart: {
      type: "bar",
      stacked: true,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: productNames,
      title: {
        text: "Quantity",
      },
    },
    yaxis: {
      title: {
        text: "Product Name",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#0090FF", "#FEB019", "#00E396"],

    fill: {
      type: "solid",
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  async function fetchSalesData() {
    try {
      const response = await getTopSellingProducts();
      const data = response.data;

      const extracted = data.map((item) => item.product_name);
      const currentMonthCount = data.map((item) =>
        parseFloat(item.current_month_count)
      );
      const previousMonthCount = data.map((item) =>
        parseFloat(item.last_month_count)
      );

      setProductNames(extracted);
      setSalesData([
        {
          name: "Previous Month Count",
          data: previousMonthCount,
        },
        {
          name: "Current Month Count",
          data: currentMonthCount,
        },
      ]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchSalesData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Chart options={chartOptions} series={salesData} type="bar" height={250}/>
  );
};

export default TopSellingBranch;
