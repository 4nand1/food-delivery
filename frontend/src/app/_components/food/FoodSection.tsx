"use client";

import FoodCard, { type FoodItem } from "./FoodCard";

export default function FoodSection({
  title,
  items,
  onAddClick,
}: {
  title: string;
  items: FoodItem[];
  onAddClick?: (item: FoodItem) => void;
}) {
  const safeItems = Array.isArray(items) ? items.filter(Boolean) : [];

  return (
    <section className="w-full">
      <div className="mb-3">
        <h2 className="text-sm font-semibold text-white/90">{title}</h2>
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(1,minmax(0,1fr))] sm:[grid-template-columns:repeat(2,minmax(0,1fr))] lg:[grid-template-columns:repeat(3,minmax(0,1fr))]">
        {safeItems.map((item) => (
          <FoodCard key={item.id} item={item} onAddClick={onAddClick} />
        ))}
      </div>
    </section>
  );
}
