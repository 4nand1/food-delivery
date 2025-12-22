"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeliveryAddressDialog from "./DeliveryAddressDialog";
import CartSheet from "@/app/_components/cart/CartSheet";

export default function Header() {
  return (
    <header className="w-full bg-zinc-900">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img src="/Logo Container.png" alt="Logo" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <DeliveryAddressDialog />

          {/* ✅ Cart opens sheet (no Link) */}
          <CartSheet>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </CartSheet>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
