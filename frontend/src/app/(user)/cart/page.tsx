"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-zinc-100 px-4 py-6">
      <div className="mx-auto max-w-[720px]">
        {/* Title */}
        <div className="mb-6 flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-zinc-900" />
          <h1 className="text-lg font-semibold text-zinc-900">
            Your cart
          </h1>
        </div>

        {/* Empty cart state */}
        <div className="rounded-xl bg-white p-6 text-center shadow-sm">
          <p className="text-sm text-zinc-500">
            Your cart is currently empty.
          </p>

          <Button asChild className="mt-4">
            <Link href="/">
              Back to menu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
