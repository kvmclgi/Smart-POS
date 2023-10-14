const orders = [
  {
    order_id: 1,
    customer_id: 1,
    employee_id: 1,
    date: "2021-09-30",
    branch_id: 1,
  },
];

const cart = [
  {
    order_id: 1,
    product_id: 1,
    quantity: 1,
    totalPrice: 100,
    grossProfit: 50,
  },
  {
    order_id: 1,
    product_id: 2,
    quantity: 2,
    totalPrice: 200,
    grossProfit: 100,
  },
  {
    order_id: 1,
    product_id: 3,
    quantity: 3,
    totalPrice: 300,
    grossProfit: 150,
  },
];

export function saveOrder(employee, customer, order_cart) {
  const order_id = orders.length + 1;
  const order = {
    order_id,
    customer_id: customer.id,
    employee_id: employee.id,
    date: new Date().toISOString().slice(0, 10),
    branch_id: employee.branch_id,
  };
  console.log(order_cart);
  const orderDetails = order_cart.map((item) => {
    return {
      order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      totalPrice: parseFloat(item.quantity * item.retailPrice.slice(4)).toFixed(
        2
      ),
      grossProfit: parseFloat(
        item.quantity *
          (item.retailPrice.slice(4) -
            item.buyingPrice.slice(4) -
            item.discount)
      ).toFixed(2),
    };
  });

  orders.push(order);
  orderDetails.forEach((item) => cart.push(item));
  console.log("cart", cart);
}

export function getOrdersByMonth(month) {
  const monthOrders = orders.filter(
    (order) => parseInt(order.date.slice(5, 7)) === month
  );
  const monthOrdersDetails = monthOrders.map((order) => {
    const orderDetails = cart.filter(
      (item) => item.order_id === order.order_id
    );
    return {
      ...order,
      orderDetails,
    };
  });

  return monthOrdersDetails;
}
