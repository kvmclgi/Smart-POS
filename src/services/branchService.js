import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/branch`;

export function getAllBranches() {
  return http.get(ApiEndPoint);
}

export function getBranch(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function addBranch(data) {
  return http.post(ApiEndPoint, data);
}
