"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore, type CartItem as CartItemType } from "@/app/store/cart.store";

export default function CartItem({ item }: { item: CartItemType }) {
  const removeItem = useCartStore((s) => s.removeItem);
  const setQty = useCartStore((s) => s.setQty);

  const title = item?.title ?? "Untitled";
  const imageSrc = item?.image?.trim() ? item.image : "/placeholder-food.png";
  const price = typeof item?.price === "number" ? item.price : 0;
  const qty = typeof item?.qty === "number" ? item.qty : 1;

  return (
    <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-zinc-100">
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>

      <div className="flex flex-1 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#FF4D2E]">
            {title}
          </p>
          <p className="mt-1 text-xs text-zinc-500">${price.toFixed(2)}</p>

          <div className="mt-3 flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-zinc-100"
              onClick={() => setQty(item.id, qty - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-8 text-center text-sm font-semibold text-zinc-900">
              {qty}
            </span>

            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-zinc-100"
              onClick={() => setQty(item.id, qty + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-500 hover:text-zinc-900"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
