const Categories = [
  {
    category_id: 1,
    name: "Biscuit",
  },
  {
    category_id: 2,
    name: "Rice",
  },
];

// will return all categories that are created
export function getCategories() {
  return Categories.filter((g) => g);
}

// will return Category bolongs to given id
export function getCategory(id) {
  return Categories.find((c) => c.category_id == id);
}

// will add new Category
export function addNewCategory(name) {
  Categories.push({ category_id: Categories.length, name });
}
