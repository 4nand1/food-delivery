"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCart, FoodItem } from "@/app/_components/cart/CartProvider";

type Item = FoodItem;

export default function FoodCard({ item }: { item: Item }) {
  const { addToCart } = useCart();

  const title = item?.title ?? "Untitled";
  const price = typeof item?.price === "number" ? item.price : 0;
  const desc = item?.desc ?? "";
  const image = item?.image ?? "/food-1.png";

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      {/* Image */}
      <div className="relative h-[150px] w-full bg-zinc-100">
        <Image src={image} alt={title} fill className="object-cover" />

        <Button
          type="button"
          size="icon"
          variant="secondary"
          onClick={() => addToCart(item)}
          className="absolute right-3 top-3 h-7 w-7 rounded-full bg-white hover:bg-white"
        >
          <Plus className="h-4 w-4 text-zinc-900" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-[#ff4b2b]">{title}</p>
          <p className="text-sm font-semibold text-zinc-900">
            ${price.toFixed(2)}
          </p>
        </div>

        {!!desc && <p className="mt-2 text-xs leading-4 text-zinc-500">{desc}</p>}
      </div>
    </div>
  );
}
