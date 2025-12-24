"use client";

import { useMemo, useState } from "react";
import type { DeliveryState } from "../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChangeDeliveryStateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialState: DeliveryState;
  onSave: (nextState: DeliveryState) => void;
};

const options: DeliveryState[] = ["Delivered", "Pending", "Cancelled"];

export default function ChangeDeliveryStateDialog({
  open,
  onOpenChange,
  initialState,
  onSave,
}: ChangeDeliveryStateDialogProps) {
  const [selected, setSelected] = useState<DeliveryState>(initialState);

  // keep in sync when switching orders
  const syncKey = useMemo(() => initialState, [initialState]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent key={syncKey} className="max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Change delivery state</DialogTitle>
        </DialogHeader>

        <div className="mt-2 flex gap-2">
          {options.map((opt) => {
            const active = selected === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setSelected(opt)}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm transition",
                  active ? "bg-neutral-900 text-white" : "bg-white hover:bg-neutral-50"
                )}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onSave(selected);
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
