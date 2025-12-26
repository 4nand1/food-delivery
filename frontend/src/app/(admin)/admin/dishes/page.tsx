"use client";

import { useMemo, useState } from "react";
import type { Dish, DishCategory } from "@/app/_components/admin/dishes/types";
import { mockCategories, mockDishes } from "@/app/_components/admin/dishes/mock";

import CategoryPills from "@/app/_components/admin/dishes/CategoryPills";
import DishesGrid from "@/app/_components/admin/dishes/DishesGrid";
import DishFormDialog from "@/app/_components/admin/dishes/DishFormDialog";
import CategoryFormDialog from "@/app/_components/admin/dishes/CategoryFormDialog";

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
        <p className="text-sm text-neutral-600">Categories + dishes grid (UI only).</p>
      </div>

      <CategoryPills
        categories={categories}
        activeCategoryId={activeCategoryId}
        onChange={setActiveCategoryId}
      />

      <DishesGrid dishes={filtered} />

      {/* UI-only: одоохондоо open=false (дараагийн алхамд холбож ажиллуулна) */}
      <DishFormDialog open={false} onOpenChange={() => {}} mode="create" />
      <CategoryFormDialog open={false} onOpenChange={() => {}} />
    </div>
  );
}
