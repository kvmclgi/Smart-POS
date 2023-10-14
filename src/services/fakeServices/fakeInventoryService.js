import { products } from "../fakeProductService";

const inventory = [
  {
    product_id: 29,
    branch_id: 1,
    quantity: 42,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 34,
    branch_id: 1,
    quantity: 14,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 11,
    branch_id: 2,
    quantity: 90,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 12,
    branch_id: 1,
    quantity: 93,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 17,
    branch_id: 3,
    quantity: 67,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 43,
    branch_id: 3,
    quantity: 71,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 3,
    branch_id: 1,
    quantity: 88,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 24,
    branch_id: 3,
    quantity: 91,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 42,
    branch_id: 3,
    quantity: 95,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 2,
    branch_id: 1,
    quantity: 20,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 20,
    branch_id: 1,
    quantity: 27,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 46,
    branch_id: 1,
    quantity: 98,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 12,
    branch_id: 1,
    quantity: 65,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 2,
    branch_id: 1,
    quantity: 34,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 13,
    branch_id: 3,
    quantity: 100,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 29,
    branch_id: 2,
    quantity: 42,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 36,
    branch_id: 1,
    quantity: 64,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 19,
    branch_id: 1,
    quantity: 41,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 22,
    branch_id: 1,
    quantity: 27,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 2,
    branch_id: 3,
    quantity: 11,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 33,
    branch_id: 1,
    quantity: 20,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 49,
    branch_id: 3,
    quantity: 17,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 32,
    branch_id: 1,
    quantity: 18,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 26,
    branch_id: 3,
    quantity: 26,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 21,
    branch_id: 2,
    quantity: 60,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 32,
    branch_id: 1,
    quantity: 14,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 4,
    branch_id: 1,
    quantity: 36,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 6,
    branch_id: 2,
    quantity: 95,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 47,
    branch_id: 3,
    quantity: 45,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 31,
    branch_id: 2,
    quantity: 75,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 7,
    branch_id: 2,
    quantity: 67,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 9,
    branch_id: 1,
    quantity: 31,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 5,
    branch_id: 1,
    quantity: 10,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 13,
    branch_id: 2,
    quantity: 44,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 15,
    branch_id: 3,
    quantity: 91,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 33,
    branch_id: 1,
    quantity: 80,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 47,
    branch_id: 1,
    quantity: 74,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 13,
    branch_id: 1,
    quantity: 82,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 36,
    branch_id: 1,
    quantity: 91,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 50,
    branch_id: 2,
    quantity: 88,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 1,
    branch_id: 1,
    quantity: 25,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 1,
    branch_id: 3,
    quantity: 18,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 46,
    branch_id: 2,
    quantity: 34,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 45,
    branch_id: 3,
    quantity: 62,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 36,
    branch_id: 2,
    quantity: 87,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 13,
    branch_id: 2,
    quantity: 87,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 46,
    branch_id: 3,
    quantity: 71,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 36,
    branch_id: 1,
    quantity: 73,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 15,
    branch_id: 1,
    quantity: 51,
    updatedAt: "2020 Aug 21",
  },
  {
    product_id: 35,
    branch_id: 3,
    quantity: 89,
    updatedAt: "2020 Aug 21",
  },
];

// will return each product with its stock quantity in each branch
export function getInventory() {
  const allProducts = [...products];
  const inventoryInfo = [];
  allProducts.forEach((product) => {
    const quantityInfo = inventory.filter(
      (i) => i.product_id === product.product_id
    );
    product.stock = quantityInfo
      ? [...quantityInfo]
      : {
          product_id: product.product_id,
          branch_id: "",
          quantity: 0,
          updatedAt: "out of stock",
        };
    inventoryInfo.push(product);
  });
  return inventoryInfo;
}

// will return each product with its stock quantity in a given branch
export function getInventoryByBranch(branchId) {
  const allProducts = [...products];
  const inventoryInfo = [];
  allProducts.forEach((product) => {
    const quantityInfo = inventory.find(
      (i) => i.product_id === product.product_id && i.branch_id === branchId
    );
    product.stock = {
      branch_id: branchId,
      quantity: quantityInfo !== undefined ? quantityInfo.quantity : 0,
    };
    inventoryInfo.push(product);
  });
  return inventoryInfo;
}

// will return the product with its stock quantity
export function getInventoryByProduct(productId) {
  const allInventory = getInventory();
  return allInventory.find((i) => i.product_id.toString() === productId);
}

// will return each product with its stock quantity in a given branch
export function getInventoryByBranchAndProduct(branchId, productId) {
  return inventory.filter(
    (i) => i.branch_id === branchId && i.product_id === productId
  );
}

export function updateInventory(previousStock, newStock) {
  console.log(previousStock, newStock);
  const inventoryCopy = inventory;
  const index = inventoryCopy.indexOf(previousStock);
  if (index) {
    const updatedStock = {
      product_id: previousStock.product_id,
      branch_id: "",
      quantity: newStock,
      updatedAt: new Date().toDateString(),
    };
    inventoryCopy.push(updatedStock);
    return updatedStock;
  } else {
    inventoryCopy[index].quantity += newStock;
    inventoryCopy[index].updatedAt = new Date().toDateString();
    return inventoryCopy[index];
  }
}
