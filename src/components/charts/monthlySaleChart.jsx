import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getMonthlySale } from "../../services/reportService";

const MonthlySaleChart = ({ height, width, branch_id }) => {
  const [saleSeries, setSaleSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const saleChartOptions = {
    chart: {
      type: "area",
      stacked: false,
      animations: {
        enabled: true,
        easing: "linear",
        speed: 1800,
      },
    },
    colors: ['#0090FF','#FEB019','#00E396' ],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.1,
        opacityTo: 0.8,
      },
      colors: ['#0090FF','#FEB019','#00E396' ],
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    xaxis: {
      categories: Array.from({ length: 31 }, (_, i) => i + 1),
      title: {
        text: "Day",
      },
    
    },
    yaxis: {
      title: {
        text: "Sales  (Rs)",
      },
    },
    markers: {
      size: 0,
      strokeColor: "#fff",
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 6
      }
    },
    
    
  };

  async function fetchMonthlySale(yearMonth) {
    try {
      const { data } = await getMonthlySale(yearMonth, branch_id);
      let dayArray = Array.from({ length: 31 }, () => 0);
      data.forEach((item) => {
        dayArray[item.day.slice(8, 10) - 1] = item.total_sales;
      });
      return dayArray;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // January is 0
      const monthsToFetch = [currentMonth, currentMonth - 1, currentMonth - 2];
      const seriesData = [];

      for (const month of monthsToFetch) {
        const yearMonth = `${currentYear}-${month.toString().padStart(2, "0")}`;
        const monthData = await fetchMonthlySale(yearMonth);
        const monthName = new Date(currentYear, month - 1, 1).toLocaleString(
          "default",
          { month: "long" }
        );

        seriesData.push({
          name: monthName,
          data: monthData,
        });
      }

      setSaleSeries(seriesData);
      setLoading(false);
    };
    fetchData();
  }, [branch_id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="area">
      <Chart
        options={saleChartOptions}
        series={saleSeries}
        type="area"
        height={height}
        width={width}
      />
    </div>
  );
};

export default MonthlySaleChart;
