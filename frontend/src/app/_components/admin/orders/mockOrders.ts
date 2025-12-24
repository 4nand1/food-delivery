import type { AdminOrder } from "../types";

export const mockOrders: AdminOrder[] = [
  {
    id: "ORD-1001",
    customerEmail: "test@gmail.com",
    items: [
      { id: "i1", title: "Sunshine Stackers", qty: 1 },
      { id: "i2", title: "Burger Combo", qty: 1 },
    ],
    date: "2024/12/20",
    total: 26.97,
    deliveryAddress: "2024/12/20, 12-р хороо, C6A",
    deliveryState: "Pending",
  },
  {
    id: "ORD-1002",
    customerEmail: "amgalan@gmail.com",
    items: [{ id: "i3", title: "Chicken Salad", qty: 2 }],
    date: "2024/12/20",
    total: 18.5,
    deliveryAddress: "Bayanzurkh, UB",
    deliveryState: "Delivered",
  },
];
