import React, { useEffect, useState } from "react";
import Pagination from "../common/pagination";
import SaleHistoryTable from "../sale/saleHistoryTable";
import { paginate } from "../../utils/paginate";
import _ from "lodash";

import { getSalesHistoryToday } from "../../services/reportService";

function SaleHistoryToday({ branch_id }) {
  const [saleToday, setSaleToday] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [sortColumn, setSortColumn] = useState({
    path: "order_id",
    order: "desc",
  });

  useEffect(() => {
    async function fetchData() {
      const { data: saleToday } = await getSalesHistoryToday(branch_id);
      setSaleToday(saleToday);
    }

    fetchData();
  }, [branch_id]);

  // Function to handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle sorting
  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  // Function to paginate the data
  const getPagedData = () => {
    const sorted = _.orderBy(saleToday, [sortColumn.path], [sortColumn.order]);
    const pagedData = paginate(sorted, currentPage, pageSize);
    return { totalCount: saleToday.length, data: pagedData };
  };

  // Get paginated and sorted data
  const { totalCount, data: pagedData } = getPagedData();

  if (saleToday.length === 0) {
    return <p>There are no sales for today.</p>;
  } else {
    return (
      <div className="container my-3">
        <p>
          Total number of sales for today: {totalCount}</p>
        <SaleHistoryTable
          salesToday={pagedData}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
}

export default SaleHistoryToday;
