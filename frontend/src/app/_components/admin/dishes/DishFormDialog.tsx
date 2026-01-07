"use client";

import { useEffect, useState } from "react";
import type { Dish, DishCategory } from "./types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type DishDraft = {
  title: string;
  price: string; // input string байдаг
  ingredients: string;
  imageUrl: string;
  categoryId: string;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: "create" | "edit";
  categories: DishCategory[];
  initialDish?: Dish | null;
  onSubmit: (payload: {
    title: string;
    price: number;
    ingredients: string;
    imageUrl?: string;
    categoryId: string;
  }) => void;
};

export default function DishFormDialog({
  open,
  onOpenChange,
  mode,
  categories,
  initialDish,
  onSubmit,
}: Props) {
  const [draft, setDraft] = useState<DishDraft>({
    title: "",
    price: "",
    ingredients: "",
    imageUrl: "",
    categoryId: categories.find((c) => c.id !== "all")?.id ?? "all",
  });

  // dialog нээгдэх бүрт edit үед existing dish-ийг form руу хийж өгнө
  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialDish) {
      setDraft({
        title: initialDish.title ?? "",
        price: String(initialDish.price ?? ""),
        ingredients: initialDish.ingredients ?? "",
        imageUrl: initialDish.imageUrl ?? "",
        categoryId: initialDish.categoryId ?? "all",
      });
      return;
    }

    // create үед form цэвэр
    setDraft({
      title: "",
      price: "",
      ingredients: "",
      imageUrl: "",
      categoryId: categories.find((c) => c.id !== "all")?.id ?? "all",
    });
  }, [open, mode, initialDish, categories]);

  const titleText = mode === "create" ? "Add new dish" : "Edit dish";

  const handleSave = () => {
    const priceNum = Number(draft.price);
    const safePrice = Number.isFinite(priceNum) ? priceNum : 0;

    onSubmit({
      title: draft.title.trim() || "Untitled",
      price: safePrice,
      ingredients: draft.ingredients.trim(),
      imageUrl: draft.imageUrl.trim() ? draft.imageUrl.trim() : undefined,
      categoryId: draft.categoryId,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid gap-2">
            <label className="text-xs font-medium text-neutral-700">Dish name</label>
            <input
              className="h-10 rounded-lg border px-3 text-sm"
              value={draft.title}
              onChange={(e) => setDraft((p) => ({ ...p, title: e.target.value }))}
              placeholder="Type dish name"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-neutral-700">Dish price</label>
            <input
              className="h-10 rounded-lg border px-3 text-sm"
              value={draft.price}
              onChange={(e) => setDraft((p) => ({ ...p, price: e.target.value }))}
              placeholder="12.99"
              inputMode="decimal"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-neutral-700">Category</label>
            <select
              className="h-10 rounded-lg border px-3 text-sm"
              value={draft.categoryId}
              onChange={(e) => setDraft((p) => ({ ...p, categoryId: e.target.value }))}
            >
              {categories
                .filter((c) => c.id !== "all")
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-neutral-700">Ingredients</label>
            <textarea
              className="min-h-[90px] rounded-lg border p-3 text-sm"
              value={draft.ingredients}
              onChange={(e) => setDraft((p) => ({ ...p, ingredients: e.target.value }))}
              placeholder="List ingredients..."
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs font-medium text-neutral-700">
              Food image URL (optional)
            </label>
            <input
              className="h-10 rounded-lg border px-3 text-sm"
              value={draft.imageUrl}
              onChange={(e) => setDraft((p) => ({ ...p, imageUrl: e.target.value }))}
              placeholder="/food-1.png"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
