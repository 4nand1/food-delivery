"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeliveryAddressDialog from "./DeliveryAddressDialog";
import CartSheet from "@/app/_components/cart/CartSheet";
import { useCart } from "@/app/_components/cart/CartProvider";

export default function Header() {
  const { count } = useCart();

  return (
    <header className="w-full bg-zinc-900">
      <div className="mx-auto h-14 px-4 flex items-center justify-between">
        <Link href="/">
          <img src="Logo Container.png" alt="Logo" />
        </Link>

        <div className="flex items-center gap-2">
          <DeliveryAddressDialog />

          {/* ✅ Cart sheet trigger */}
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5 text-white" />

              {/* badge (UI only) */}
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#ff4b2b] px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Button>
          </CartSheet>

          <Button variant="ghost" size="icon" className="text-white">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
