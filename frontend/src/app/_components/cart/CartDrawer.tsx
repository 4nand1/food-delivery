"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "./CartProvider";
import CartPanel from "./CartPanel";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent side="right" className="w-[360px] p-0 sm:w-[400px]">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-sm font-semibold text-zinc-900">
            Order detail
          </SheetTitle>
        </SheetHeader>

        <CartPanel />
      </SheetContent>
    </Sheet>
  