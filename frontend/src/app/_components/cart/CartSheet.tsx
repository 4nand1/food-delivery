"use client";

import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CartPanel from "./CartPanel";

export default function CartSheet({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side="right" className="w-[360px] p-0 sm:w-[400px]">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-sm font-semibold text-zinc-900">
            Order detail
          </SheetTitle>
        </SheetHeader>

        <CartPanel />
      </SheetContent>
    </Sheet>
  );
}
