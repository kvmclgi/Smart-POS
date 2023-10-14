const accessLevels = [
  "configuration",
  "report",
  // employee management access levels
  "employee",
  "employeeDetails",
  "addEmployee",
  // inventory management access levels
  "inventory",
  "productForm",
  "stockUpdateForm",
  "productCatalog",
  // customer management access levels
  "customerForm",
  "customers",
  "report",
  // supplier management access levels
  "supplierForm",
  "supplier",
  "supplierDetails",
  //branch management access levels
  "addBranch",
];

const userRoles = [
  {
    userRole_id: 1,
    name: "Owner",
    access: [
      "employee",
      "inventory",
      "customers",
      "customerForm",
      "report",
      "productCatalog",
      "productForm",
      "stockUpdateForm",
      "addEmployee",
      "employeeDetails",
      "configuration",
      "supplierForm",
      "supplier",
      "supplierDetails",
      "addBranch",
    ],
    description:
      "The owner role has full control and authority over the business or organization. Owners make critical decisions and have access to all resources.",
  },
  {
    userRole_id: 2,
    name: "Manager",
    access: [
      "employee",
      "inventory",
      "customer",
      "customerForm",
      "productCatalog",
      "configuration",
      "productForm",
    ],
    description:
      "Managers are responsible for overseeing daily operations and supervising staff. They have access to most resources and can make important decisions within their department.",
  },
  {
    userRole_id: 3,
    name: "Cashier",
    access: ["customer", "customerForm", "productCatalog"],
    description:
      "Cashiers handle customer transactions, manage the cash register, and provide customer service. They have limited access to administrative functions.",
  },
  {
    userRole_id: 4,
    name: "Sales Associate",
    access: ["report", "productCatalog"],
    description:
      "Sales associates assist customers, promote products, and process sales. They have limited access to administrative functions and focus on sales-related tasks.",
  },
  {
    userRole_id: 5,
    name: "Guest",
    access: ["productCatalog"],
    description:
      "Guests are customers or visitors who do not have any administrative privileges. They can browse products or services but cannot access the system's internal functions.",
  },
];

export function getAccessLevels() {
  return accessLevels;
}

export function getUserRoles() {
  return userRoles.filter((u) => u);
}

export function getUserRole(id) {
  return userRoles.find((u) => u.userRole_id === id);
}

export function checkAccess(userRole_id, accessLevel) {
  const userRole = getUserRole(userRole_id);
  return userRole.access.includes(accessLevel);
}
