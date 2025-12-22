"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export default function QuantityControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const v = Number.isFinite(value) ? value : 1;

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-full bg-zinc-100"
        onClick={() => onChange(Math.max(1, v - 1))}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <span className="w-8 text-center text-sm font-semibold text-zinc-900">
        {v}
      </span>

      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-full bg-zinc-100"
        onClick={() => onChange(Math.min(99, v + 1))}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
