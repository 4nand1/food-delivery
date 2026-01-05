"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useCart } from "@/context/cart-context";

export default function CartPanel() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const shipping = 0.99;
  const itemsTotal = getTotalPrice();
  const total = cartItems.length === 0 ? 0 : itemsTotal + shipping;

  return (
    <div className="flex h-full flex-col bg-[#FAFAFA]">
      <div className="px-4 pt-4">
        <div className="rounded-full bg-zinc-200 p-1">
          <div className="grid grid-cols-2 gap-1">
            <button className="rounded-full bg-[#ff4b2b] py-2 text-xs font-semibold text-white">
              Cart
            </button>
            <button className="rounded-full py-2 text-xs font-semibold text-zinc-700">
              Order
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
          <p className="text-xs font-semibold text-zinc-900">My cart</p>

          {cartItems.length === 0 ? (
            <p className="mt-3 text-xs text-zinc-500">Cart is empty.</p>
          ) : (
            <div className="mt-3 space-y-3">
              {cartItems.map((it) => (
                <div key={it.id} className="flex gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-zinc-100">
                    <Image
                      src={it.image}
                      alt={it.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-[#ff4b2b]">
                      {it.name}
                    </p>

                    {!!it.description && (
                      <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-zinc-500">
                        {it.description}
                      </p>
                    )}

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-zinc-900">
                        <button
                          type="button"
                          onClick={() => updateQuantity(it.id, it.quantity - 1)}
                          className="h-6 w-6 rounded-full bg-zinc-100"
                        >
                          -
                        </button>

                        <span className="w-4 text-center">{it.quantity}</span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(it.id, it.quantity + 1)}
                          className="h-6 w-6 rounded-full bg-zinc-100"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-zinc-900">
                        {it.price}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(it.id)}
                    className="mt-1 h-6 w-6 rounded-full bg-zinc-100 text-zinc-700"
                    aria-label="Remove"
                  >
                    <X className="mx-auto h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto px-4 pb-4 pt-4">
        <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
          <p className="text-xs font-semibold text-zinc-900">Payment info</p>

          <div className="mt-3 space-y-2 text-xs text-zinc-700">
            <div className="flex items-center justify-between">
              <span>Items ({getTotalItems()})</span>
              <span className="font-semibold text-zinc-900">
                ${itemsTotal.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span className="font-semibold text-zinc-900">
                ${cartItems.length === 0 ? "0.00" : shipping.toFixed(2)}
              </span>
            </div>

            <div className="my-2 border-t pt-2" />

            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-900">Total</span>
              <span className="font-semibold text-zinc-900">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            disabled={cartItems.length === 0}
            className="mt-3 w-full rounded-full bg-[#ff4b2b] hover:bg-[#ff4b2b]/90 disabled:opacity-50"
            onClick={() => alert("Checkout (UI only)")}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
