"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Dish } from "./types";

type DishFormPayload = {
  title: string;
  price: number;
  ingredients: string;
  imageUrl: string;
  categoryId: string;
};

type DishFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode: "create" | "edit";
  initialDish?: Dish;

  onSubmit?: (payload: DishFormPayload) => void;
};

export default function DishFormDialog({
  open,
  onOpenChange,
  mode,
  initialDish,
  onSubmit,
}: DishFormDialogProps) {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("12.99");
  const [ingredients, setIngredients] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("appetizers");

  useEffect(() => {
    if (mode === "edit" && initialDish) {
      setTitle(initialDish.title ?? "");
      setPrice(String(initialDish.price ?? 0));
      setIngredients(initialDish.ingredients ?? "");
      setImageUrl(initialDish.imageUrl ?? "");
      setCategoryId(initialDish.categoryId ?? "appetizers");
    } else {
      setTitle("");
      setPrice("12.99");
      setIngredients("");
      setImageUrl("");
      setCategoryId("appetizers");
    }
  }, [mode, initialDish, open]);

  const handleClose = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
  };

  const handleSubmit = () => {
    const safeTitle = title.trim();
    const numericPrice = Number(price);

    if (!safeTitle) return;

    const payload: DishFormPayload = {
      title: safeTitle,
      price: Number.isFinite(numericPrice) ? numericPrice : 0,
      ingredients: ingredients.trim(),
      imageUrl: imageUrl.trim(),
      categoryId: categoryId.trim() || "appetizers",
    };

    onSubmit?.(payload);
    handleClose(false);
  };

  const heading = mode === "edit" ? "Edit dish" : "Add new dish";

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{heading}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs text-neutral-600">Dish title</p>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Dish name" />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-neutral-600">Price</p>
              <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="12.99" />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-neutral-600">Ingredients</p>
            <Input
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Short ingredients text"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs text-neutral-600">Image URL (optional)</p>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/food-1.png"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-neutral-600">Category ID</p>
              <Input
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder="appetizers"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" type="button" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={!title.trim()}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
