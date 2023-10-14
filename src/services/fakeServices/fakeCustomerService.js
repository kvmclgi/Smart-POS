const customers = [
  {
    id: 1,
    name: "Nevile Kelly",
    contact: "nkelly0@hibu.com",
    visitCount: 95,
    totalSpent: 1488,
    pointCount: 39,
  },
  {
    id: 2,
    name: "Koressa McPike",
    contact: "kmcpike1@infoseek.co.jp",
    visitCount: 83,
    totalSpent: 8103,
    pointCount: 46,
  },
  {
    id: 3,
    name: "Fredric Daulby",
    contact: "fdaulby2@epa.gov",
    visitCount: 35,
    totalSpent: 7467,
    pointCount: 43,
  },
  {
    id: 4,
    name: "Gisella Treverton",
    contact: "gtreverton3@deviantart.com",
    visitCount: 22,
    totalSpent: 1541,
    pointCount: 7,
  },
  {
    id: 5,
    name: "Julio Bandt",
    contact: "jbandt4@meetup.com",
    visitCount: 77,
    totalSpent: 109,
    pointCount: 24,
  },
  {
    id: 6,
    name: "Aliza Lucy",
    contact: "alucy5@apple.com",
    visitCount: 9,
    totalSpent: 8857,
    pointCount: 92,
  },
  {
    id: 7,
    name: "Mikel Dulson",
    contact: "mdulson6@mozilla.com",
    visitCount: 63,
    totalSpent: 9793,
    pointCount: 10,
  },
  {
    id: 8,
    name: "Burk Petroselli",
    contact: "bpetroselli7@sogou.com",
    visitCount: 66,
    totalSpent: 5254,
    pointCount: 88,
  },
  {
    id: 9,
    name: "Arty Ranvoise",
    contact: "aranvoise8@fema.gov",
    visitCount: 76,
    totalSpent: 113,
    pointCount: 15,
  },
  {
    id: 10,
    name: "Claudette Hawk",
    contact: "chawk9@go.com",
    visitCount: 55,
    totalSpent: 8879,
    pointCount: 70,
  },
];

export function getCustomers() {
  return customers;
}

export function getCustomer(id) {
  return customers.find((c) => c.id.toString() === id);
}

export function saveCustomer(customer) {
  let customerInDb =
    customers.find((c) => c.id.toString() === customer.id) || {};
  customerInDb.name = customer.name;
  customerInDb.contact = customer.contact;
  customerInDb.visitCount = 0;
  customerInDb.totalSpent = 0;
  customerInDb.pointCount = 0;

  if (!customers.find((c) => c.id.toString() === customer.id)) {
    customerInDb.id = customers.length + 1;
    customers.push(customerInDb);
  }

  return customerInDb;
}

export function deleteCustomer(id) {
  let customerInDb = customers.find((c) => c.id === id);
  customers.splice(customers.indexOf(customerInDb), 1);
  return customerInDb;
}
