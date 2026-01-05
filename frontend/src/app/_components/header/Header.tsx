"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeliveryAddressDialog from "./DeliveryAddressDialog";
import { useCart } from "@/app/_components/cart/CartProvider";

export default function Header() {
  const { setIsCartOpen, count } = useCart();
  c

  return (
    <header className="w-full bg-zinc-900">
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img src="/Logo Container.png" alt="Logo" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <DeliveryAddressDialog />

          {/* CART */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 rounded-full bg-red-500 px-1 text-[10px] leading-5 text-white">
                {count}
              </span>
            )}
          </Button>

          {/* USER */}
          <Button variant="ghost" size="icon" className="text-white">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
