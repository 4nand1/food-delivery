"use client";

import type { DishCategory } from "./types";
import { cn } from "@/lib/utils";

type Props = {
  categories: DishCategory[];
  activeCategoryId: string;
  onChange: (nextId: string) => void;
};

export default function CategoryPills({
  categories,
  activeCategoryId,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const active = c.id === activeCategoryId;

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition",
              active
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-50"
            )}
          >
            {c.name}
          </button>
        );
      })}
    </div>
  );
}
