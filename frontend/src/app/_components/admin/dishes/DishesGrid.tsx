"use client";

import type { Dish } from "./types";
import DishCard from "./DishCard";

type Props = {
  dishes: Dish[];
  onAddClick: () => void;
  onEditClick: (dish: Dish) => void;
};

export default function DishesGrid({ dishes, onAddClick, onEditClick }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {/* Add new dish tile */}
      <button
        type="button"
        onClick={onAddClick}
        className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-red-300 bg-white p-4 text-center hover:bg-neutral-50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
          +
        </div>
        <p className="mt-3 text-sm font-semibold">Add new dish</p>
        <p className="mt-1 text-xs text-neutral-600">
          Click to create a new dish
        </p>
      </button>

      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} onEdit={() => onEditClick(dish)} />
      ))}
    </div>
  );
}
