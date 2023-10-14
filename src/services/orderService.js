import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/cart`;

export function submitOrder(data) {
  return http.post(`${ApiEndPoint}/insert`, data);
}

export function getRewardsPointsPercentage() {
  return http.get(ApiEndPoint + "/rewards-points-percentage");
}

export function updateRewardsPointsPercentage(data) {
  return http.put(ApiEndPoint + "/rewards-points-percentage", data);
}
