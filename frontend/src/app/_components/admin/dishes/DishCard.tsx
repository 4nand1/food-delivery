"use client";

import Image from "next/image";
import type { Dish } from "./types";

type DishCardProps = {
  dish?: Dish;
};

export default function DishCard({ dish }: DishCardProps) {
  if (!dish?.id) return null;

  const title = dish.title ?? "Untitled";
  const ingredients = dish.ingredients ?? "—";
  const imgSrc = dish.imageUrl?.trim() ? dish.imageUrl : "/offer-dish.png";
  const price =
    typeof dish.price === "number" && Number.isFinite(dish.price) ? dish.price : 0;

  return (
    <div className="rounded-2xl border bg-white p-3 shadow-sm">
      <div className="relative overflow-hidden rounded-xl bg-neutral-50">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className="line-clamp-1 text-sm font-semibold">{title}</p>
          <p className="shrink-0 text-sm font-semibold text-red-600">
            ${price.toFixed(2)}
          </p>
        </div>

        <p className="line-clamp-2 text-xs text-neutral-600">{ingredients}</p>
      </div>
    </div>
  );
}
