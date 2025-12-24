"use client";

import { useState } from "react";
import OrdersTable from "@/app/_components/admin/orders/OrdersTable";
import { mockOrders } from "@/app/_components/admin/orders/mockOrders";
import type { AdminOrder, DeliveryState } from "@/app/_components/admin/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>(mockOrders);

  const handleChangeState = (orderId: string, nextState: DeliveryState) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, deliveryState: nextState } : o))
    );
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Orders</h2>
        <p className="text-sm text-neutral-600">Select a row, then change delivery state.</p>
      </div>

      <OrdersTable orders={orders} onChangeDeliveryState={handleChangeState} />
    </div>
  );
}
