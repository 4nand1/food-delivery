"use client";

import type { DishCategory } from "./types";

type CategoryPillsProps = {
  categories: DishCategory[];
  activeCategoryId: string;
  onChange: (categoryId: string) => void;
};

export default function CategoryPills({
  categories,
  activeCategoryId,
  onChange,
}: CategoryPillsProps) {
  if (!categories?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => {
        const isActive = c?.id === activeCategoryId;

        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            className={[
              "rounded-full border px-3 py-1 text-xs transition",
              isActive
                ? "bg-neutral-900 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-50",
            ].join(" ")}
          >
            {c?.name ?? "—"}
          </button>
        );
      })}
    </div>
  );
}
