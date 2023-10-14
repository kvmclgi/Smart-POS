export const branches = [
  { branch_id: 1, name: "Moratuwa" },
  { branch_id: 2, name: "Colombo" },
  { branch_id: 3, name: "Negombo" },
];

export function getBranches() {
  return branches.filter((g) => g);
}

export function getBranch(id) {
  return branches.find((g) => g.branch_id === id);
}
