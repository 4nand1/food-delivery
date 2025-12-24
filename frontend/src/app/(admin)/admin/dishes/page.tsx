"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { mockCategories, mockDishes } from "@/app/_components/admin/dishes/mock";
import type { Dish, DishCategory } from "@/app/_components/admin/dishes/types";

export default function AdminDishesPage() {
  const [categories] = useState<DishCategory[]>(mockCategories);
  const [dishes] = useState<Dish[]>(mockDishes);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeCategoryId === "all") return dishes;
    return dishes.filter((d) => d.categoryId === activeCategoryId);
  }, [dishes, activeCategoryId]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Food menu</h2>
        <p className="text-sm text-neutral-600">
          Categories + dishes grid (UI only).
        </p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = c.id === activeCategoryId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategoryId(c.id)}
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

      {/* Dishes grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {filtered.map((dish) => {
          const imgSrc = dish?.imageUrl?.trim() ? dish.imageUrl : "/offer-dish.png";

          return (
            <div key={dish.id} className="rounded-2xl border bg-white p-3 shadow-sm">
              <div className="relative overflow-hidden rounded-xl bg-neutral-50">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={imgSrc}
                    alt={dish?.title ?? "Dish"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-1 text-sm font-semibold">
                    {dish?.title ?? "Untitled"}
                  </p>
                  <p className="shrink-0 text-sm font-semibold text-red-600">
                    ${dish.price.toFixed(2)}
                  </p>
                </div>

                <p className="line-clamp-2 text-xs text-neutral-600">
                  {dish?.ingredients ?? "—"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
