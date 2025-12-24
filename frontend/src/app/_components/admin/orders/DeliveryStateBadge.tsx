import type { DeliveryState } from "../types";
import { cn } from "@/lib/utils";

type DeliveryStateBadgeProps = {
  state: DeliveryState;
};

export default function DeliveryStateBadge({ state }: DeliveryStateBadgeProps) {
  const styles =
    state === "Pending"
      ? "border-red-200 bg-red-50 text-red-700"
      : state === "Delivered"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-neutral-200 bg-neutral-50 text-neutral-700";

  return (
    <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium", styles)}>
      {state}
    </span>
  );
}
