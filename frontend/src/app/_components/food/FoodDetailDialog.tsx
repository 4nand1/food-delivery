"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QuantityControl from "./QuantityControl";
import { useCart } from "@/app/_components/cart/CartProvider";


import type { FoodItem } from "./FoodCard";

export default function FoodDetailDialog({
  open,
  onOpenChange,
  item,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  item?: FoodItem;
}) {
  const { addToCart, setIsCartOpen } = useCart();

  const [qty, setQty] = useState(1);

  const canRender = Boolean(item?.id);
  const title = item?.title ?? "";
  const desc = item?.desc ?? "";
  const imageSrc = item?.image?.trim() ? item.image : "/placeholder-food.png";
  const price = typeof item?.price === "number" ? item.price : 0;

  const total = useMemo(() => price * qty, [price, qty]);

  return (
    <Dialog
      open={open && canRender}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setQty(1);
      }}
    >
      <DialogContent className="max-w-[520px] p-0">
        <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr]">
          <div className="relative h-[220px] w-full bg-zinc-100 sm:h-full">
            <Image src={imageSrc} alt={title || "Food"} fill className="object-cover" />
          </div>

          <div className="p-5">
            <p className="text-base font-semibold text-[#ff4b2b]">
              {title || "Untitled"}
            </p>

            {desc ? (
              <p className="mt-2 text-xs leading-5 text-zinc-500">{desc}</p>
            ) : null}

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-zinc-400">
                  Total price
                </p>
                <p className="text-sm font-semibold text-zinc-900">
                  ${total.toFixed(2)}
                </p>
              </div>

              <QuantityControl value={qty} onChange={setQty} />
            </div>

            <Button
              className="mt-5 w-full rounded-full bg-zinc-900 text-white hover:bg-zinc-900/90"
              type="button"
              onClick={() => {
                if (!item) return;
                addItem(
                  { id: item.id, title: item.title, price: item.price, image: item.image },
                  qty
                );
                onOpenChange(false);
              }}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
