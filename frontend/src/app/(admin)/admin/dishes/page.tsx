"use client";

import { useEffect, useMemo, useState } from "react";
import type { DishCategory } from "@/app/_components/admin/dishes/types";
import { mockCategories } from "@/app/_components/admin/dishes/mock";
import { useRouter } from "next/navigation";

import CategoryPills from "@/app/_components/admin/dishes/CategoryPills";
import DishesGrid from "@/app/_components/admin/dishes/DishesGrid";

import { api } from "@/lib/axios"; // ✅ багшийнх шиг api ашиглана

// ✅ Backend чинь энэ shape-аа өөрөө тааруулна (чи хэлсэн)
type Dish = {
  id: string;
  title: string;
  price: number;
  ingredients: string;
  imageUrl?: string;
  categoryId: string;
};

export default function AdminDishesPage() {
  const [categories] = useState<DishCategory[]>(mockCategories);

  // ✅ багшийнх шиг state
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("all");

  const router = useRouter(); // ✅ устгахгүй (чи арилгахгүй гэсэн)

  // ✅ багшийнх шиг fetch: api.get("/foods")
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get<Dish[]>("/foods");
        setDishes(Array.isArray(data) ? data : []);
      } catch (e) {
        // унасан ч page crash хийхгүй
        setDishes([]);
      }
    };

    getData();
  }, []);

  const filtered = useMemo(() => {
    if (activeCategoryId === "all") return dishes;
    return dishes.filter((d) => d.categoryId === activeCategoryId);
  }, [dishes, activeCategoryId]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Food menu</h2>
        <p className="text-sm text-neutral-600">Fetch dishes and show grid.</p>
      </div>

      <CategoryPills
        categories={categories}
        activeCategoryId={activeCategoryId}
        onChange={setActiveCategoryId}
      />

      <DishesGrid
        dishes={filtered}
        onAddClick={() => {
          // ✅ router.push-ээ устгахгүйгээр 404-гүй ажиллуулж байна
          // (route байхгүй болохоор push хийх юм бол 404 гарна)
          alert("Add new dish (UI only). Dialog/page will be connected later.");
        }}
        onEditClick={(dish) => {
          alert(`Edit dish: ${dish?.title ?? "Untitled"} (UI only)`);
        }}
      />
    </div>
  );
}
