import { getUserRoles } from "../fakeAuthorizationService";

const employees = [
  {
    id: 1,
    name: "Somesh Chandimal",
    userName: "Somesh",
    email: "slahy0@trellian.com",
    phone: "6953579061",
    branch_id: 1,
    userRole_id: 1,
  },
  {
    id: 2,
    name: "Hirushi Premarathna",
    userName: "Hirushi",
    email: "jstriker1@ameblo.jp",
    phone: "7515823058",
    branch_id: 2,
    userRole_id: 2,
  },
  {
    id: 3,
    name: "Dinithi",
    userName: "Dinithi",
    email: "spoundesford2@nifty.com",
    phone: "1301116352",
    branch_id: 3,
    userRole_id: 3,
  },
  {
    id: 4,
    name: "Abigael Samsin",
    userName: "Abigael",
    email: "asamsin3@newsvine.com",
    phone: "7866378501",
    branch_id: 1,
    userRole_id: 4,
  },
  {
    id: 5,
    name: "Frank Girardengo",
    userName: "Frank",
    email: "fgirardengo4@walmart.com",
    phone: "9909919749",
    branch_id: 2,
    userRole_id: 3,
  },
  {
    id: 6,
    name: "Blithe McAllan",
    userName: "Blithe",
    email: "bmcallan5@reverbnation.com",
    phone: "6827781736",
    branch_id: 2,
    userRole_id: 3,
  },
  {
    id: 7,
    name: "Malanie Newvell",
    userName: "Malanie",
    email: "mnewvell6@mozilla.com",
    phone: "1534737151",
    branch_id: 3,
    userRole_id: 3,
  },
  {
    id: 8,
    name: "Vanya Bette",
    userName: "Vanya",
    email: "vbette7@weebly.com",
    phone: "4483033388",
    branch_id: 3,
    userRole_id: 4,
  },
  {
    id: 9,
    name: "Karleen Orring",
    userName: "Karleen",
    email: "korring8@github.io",
    phone: "7762133941",
    branch_id: 2,
    userRole_id: 4,
  },
  {
    id: 10,
    name: "Donella Leicester",
    userName: "Donella",
    email: "dleicester9@joomla.org",
    phone: "9229496708",
    branch_id: 1,
    userRole_id: 4,
  },
];

export function getEmployees() {
  const allEmployees = [...employees];
  const userRoles = getUserRoles();
  allEmployees.forEach((employee) => {
    const userRole = userRoles.find(
      (c) => c.userRole_id === employee.userRole_id
    );
    employee.userRole_name = userRole.name;
    employee.userRole_description = userRole.description;
  });

  return allEmployees;
}

export function getEmployee(id) {
  return employees.find((c) => c.id == id);
}

export function saveEmployee(employee) {
  let employeeInDb = employees.find((c) => c.id === employee.id) || {};
  employeeInDb.name = employee.name;
  employeeInDb.email = employee.email;
  employeeInDb.branch = employee.branch;
  employeeInDb.phone = employee.phone;
  employeeInDb.userRole_id = employee.userRole_id;

  if (!employeeInDb.id) {
    employeeInDb.id = employees.length + 1;
    employees.push(employeeInDb);
  }

  return employeeInDb;
}

export function deleteEmployee(id) {
  let employeeInDb = employees.find((c) => c.id === id);
  employees.splice(employees.indexOf(employeeInDb), 1);
  return employeeInDb;
}
