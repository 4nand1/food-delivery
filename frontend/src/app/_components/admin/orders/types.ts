export type DeliveryState = "Pending" | "Delivered" | "Cancelled";

export type AdminOrderItem = {
  id: string;
  title: string;
  qty: number;
};

export type AdminOrder = {
  id: string;
  customerEmail: string;
  items: AdminOrderItem[];
  date: string; // ISO or display-ready
  total: number;
  deliveryAddress: string;
  deliveryState: DeliveryState;
};
