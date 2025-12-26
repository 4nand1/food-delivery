"use client";

import type { Dish } from "./types";
import DishCard from "./DishCard";

type DishesGridProps = {
  dishes: Dish[];
};

export default function DishesGrid({ dishes }: DishesGridProps) {
  if (!dishes?.length) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-sm text-neutral-600">
        No dishes found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
