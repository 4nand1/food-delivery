"use client";

import { useMemo, useState } from "react";
import HeroOffer from "@/app/_components/hero/HeroOffer";
import FoodSection from "@/app/_components/food/FoodSection";
import FoodDetailDialog from "@/app/_components/food/FoodDetailDialog";
import { foods, type FoodItem } from "@/app/_mock/foods";

export default function HomePage() {
  const [selected, setSelected] = useState<FoodItem | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const appetizers = useMemo(
    () => foods.filter((x) => x.category === "appetizers"),
    []
  );
  const salads = useMemo(
    () => foods.filter((x) => x.category === "salads"),
    []
  );
  const lunch = useMemo(() => foods.filter((x) => x.category === "lunch"), []);

  return (
    <div className="w-full space-y-8">
      <HeroOffer />

      <FoodSection
        title="Appetizers"
        items={appetizers}
        onAddClick={(item) => {
          setSelected(item);
          setOpen(true);
        }}
      />

      <FoodSection
        title="Salads"
        items={salads}
        onAddClick={(item) => {
          setSelected(item);
          setOpen(true);
        }}
      />

      <FoodSection
        title="Lunch favorites"
        items={lunch}
        onAddClick={(item) => {
          setSelected(item);
          setOpen(true);
        }}
      />

      <FoodDetailDialog open={open} onOpenChange={setOpen} item={selected} />
    </div>
  );
}
