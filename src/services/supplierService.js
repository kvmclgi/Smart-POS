import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/supplier`;

export function getSuppliers() {
  return http.get(ApiEndPoint);
}

export function getSupplier(id) {
  return http.get(ApiEndPoint + "/" + id);
}

export function addSupplier(supplier) {
  console.log("Supplier Service", supplier);
  return http.post(ApiEndPoint, supplier);
}
