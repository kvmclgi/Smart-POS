import http from "./httpService";

const ApiEndPoint = `${process.env.REACT_APP_BACKEND}/employee`;
const WorkingHourEndPoint = `${process.env.REACT_APP_BACKEND}/employee/working-hour`;

export function getEmployees() {
  return http.get(ApiEndPoint);
}

export function getEmployee(id) {
  return http.get(`${ApiEndPoint}/${id}`);
}

export function getEmployeeByBranch(branch_id) {
  return http.get(`${ApiEndPoint}/branch/${branch_id}`);
}

export function getEmployeeByRole(role_id) {
  return http.get(`${ApiEndPoint}/role/${role_id}`);
}

export function updateEmployee(id, data) {
  return http.put(`${ApiEndPoint}/${id}`, data);
}

export function updateEmployeeImage(id, file) {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return http.put(`${ApiEndPoint}/image/${id}`, formData, config);
}

// const employeeHour = [
// {
//   employee_id: 2,
//   employee_name: "johnDoe",
//   role_name: "Finance Manager",
//   shift_on: "",
//   shift_off: "",
//   total_hours: 8,
//   present: true,
//   updated_by: 1,
//   date: "2023-10-06",
// },
// ];

// export function addEmployeeRecord(data) {
//   return employeeHour.push({ ...data });
// }

// export function getEmployeeHourRecord(date) {
//   return employeeHour.filter((record) => record.date === date);
// }

export function getRecordByDate(date) {
  return http.get(`${WorkingHourEndPoint}/date/${date}`);
}

export function getRecordByDateBranch(date, branch_id) {
  return http.get(`${WorkingHourEndPoint}/date-branch/${date}/${branch_id}`);
}

export function addEmployeeRecord(data) {
  return http.post(WorkingHourEndPoint, data);
}
