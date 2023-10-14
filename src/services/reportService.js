import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/chart`;

export function getMonthlySale(yearMonth, branchId) {
  return http.get(`${ApiEndPoint}/${yearMonth}/${branchId}`);
}

export function getSalesHistoryToday(branch_id) {
  return http.get(`${ApiEndPoint}/sale_history/${branch_id}`);
}

export function getMonthlySummary() {
  return http.get(`${ApiEndPoint}/monthly_summary`);
}

export function getTopBranches(target_month) {
  return http.get(`${ApiEndPoint}/${target_month}`);
}

export function getThreeMonths() {
  return http.get(`${ApiEndPoint}/three/months/now`);
}

export function getTopSellingProducts() {
  return http.get(`${ApiEndPoint}/top/selling/products`);
}
