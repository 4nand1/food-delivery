"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export type FoodItem = {
  id: string;
  title: string;
  price: number;
  desc: string;
  image: string;
};

export default function FoodCard({
  item,
  onAddClick,
}: {
  item?: FoodItem;
  onAddClick?: (item: FoodItem) => void;
}) {
  if (!item?.id) return null;

  const title = item.title ?? "Untitled";
  const desc = item.desc ?? "";
  const imageSrc = item.image?.trim() ? item.image : "/placeholder-food.png";

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
      <div className="relative h-[210px] w-full bg-zinc-100">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <Button
          type="button"
          size="icon"
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white text-zinc-900 hover:bg-white"
          onClick={() => onAddClick?.(item)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold text-[#ff4b2b]">{title}</p>
          <p className="text-xs font-semibold text-zinc-900">
            ${item.price.toFixed(2)}
          </p>
        </div>

        <p className="mt-1 text-[10px] leading-4 text-zinc-500">{desc}</p>
      </div>
    </div>
  );
}
