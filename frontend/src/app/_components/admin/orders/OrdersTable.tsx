"use client";

import { useMemo, useState } from "react";
import type { AdminOrder, DeliveryState } from "@/app/_components/admin/types";

import DeliveryStateBadge from "./DeliveryStateBadge";
import ChangeDeliveryStateDialog from "./ChangeDeliveryStateDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type OrdersTableProps = {
  orders: AdminOrder[];
  onChangeDeliveryState: (orderId: string, nextState: DeliveryState) => void;
};

export default function OrdersTable({ orders, onChangeDeliveryState }: OrdersTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);

  const activeOrder = useMemo(
    () => orders.find((o) => o.id === activeOrderId) ?? null,
    [orders, activeOrderId]
  );

  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <div className="flex items-center justify-between gap-3 border-b p-4">
        <h3 className="text-base font-semibold">Orders</h3>
        <Button
          variant="outline"
          disabled={!activeOrder}
          onClick={() => setDialogOpen(true)}
        >
          Change delivery state
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-neutral-50 text-xs text-neutral-600">
            <tr>
              <th className="w-[140px] px-4 py-3">ID</th>
              <th className="min-w-[180px] px-4 py-3">Customer</th>
              <th className="w-[120px] px-4 py-3">Food</th>
              <th className="w-[120px] px-4 py-3">Date</th>
              <th className="w-[110px] px-4 py-3">Total</th>
              <th className="min-w-[260px] px-4 py-3">Delivery Address</th>
              <th className="w-[140px] px-4 py-3">Delivery state</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => {
              const selected = o.id === activeOrderId;
              const foodCount = o.items?.length ?? 0;

              return (
                <tr
                  key={o.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveOrderId(o.id)}
                  className={cn(
                    "cursor-pointer border-t transition",
                    selected ? "bg-neutral-50" : "hover:bg-neutral-50"
                  )}
                >
                  <td className="px-4 py-3 font-medium">{o.id}</td>
                  <td className="px-4 py-3">{o.customerEmail}</td>
                  <td className="px-4 py-3">{foodCount ? `${foodCount} foods` : "-"}</td>
                  <td className="px-4 py-3">{o.date}</td>
                  <td className="px-4 py-3">${o.total.toFixed(2)}</td>
                  <td className="px-4 py-3 text-neutral-600">{o.deliveryAddress}</td>
                  <td className="px-4 py-3">
                    <DeliveryStateBadge state={o.deliveryState} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ChangeDeliveryStateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        initialState={activeOrder?.deliveryState ?? "Pending"}
        onSave={(next) => {
          if (!activeOrder?.id) return;
          onChangeDeliveryState(activeOrder.id, next);
        }}
      />
    </div>
  );
}
