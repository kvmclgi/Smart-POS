import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/customer`;

export function getCustomers() {
  return http.get(ApiEndPoint);
}

export function getCustomer(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function addCustomer(data) {
  return http.post(`${ApiEndPoint}`, data);
}

export function findEmail(email) {
  return http.get(`${ApiEndPoint}/email/${email}`);
}

export function findPhone(phone) {
  return http.get(`${ApiEndPoint}/phone/${phone}`);
}
