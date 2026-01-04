"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useCart } from "./CartProvider";

export default function CartPanel() {
  const {
    items,
    inc,
    dec,
    removeItem,
    clear,
    itemsTotal,
    shipping,
    total,
    activeTab,
    setActiveTab,
  } = useCart();

  return (
    <div className="flex h-full flex-col bg-[#FAFAFA]">
      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="rounded-full bg-zinc-200 p-1">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setActiveTab("cart")}
              className={[
                "rounded-full py-2 text-xs font-semibold",
                activeTab === "cart"
                  ? "bg-[#ff4b2b] text-white"
                  : "text-zinc-700",
              ].join(" ")}
            >
              Cart
            </button>
            <button
              onClick={() => setActiveTab("order")}
              className={[
                "rounded-full py-2 text-xs font-semibold",
                activeTab === "order"
                  ? "bg-[#ff4b2b] text-white"
                  : "text-zinc-700",
              ].join(" ")}
            >
              Order
            </button>
          </div>
        </div>
      </div>

      {/* Content by tab */}
      {activeTab === "order" ? (
        // ✅ UI only Order view (дараа backend-тэй холбох боломжтой)
        <div className="px-4 pt-4">
          <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold text-zinc-900">Order History</p>
            <p className="mt-2 text-xs text-zinc-500">
              UI only. Backend орж ирэхээр энд захиалгын жагсаалт гарна.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* My cart */}
          <div className="px-4 pt-4">
            <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-zinc-900">My cart</p>

                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clear}
                    className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-900"
                  >
                    Clear
                  </button>
                )}
              </div>

              {items.length === 0 ? (
                <p className="mt-3 text-xs text-zinc-500">Cart is empty.</p>
              ) : (
                <div className="mt-3 space-y-3">
                  {items.map((it) => {
                    const title = it?.title ?? "Untitled";
                    const desc = it?.desc ?? "";
                    const price = typeof it?.price === "number" ? it.price : 0;
                    const qty = typeof it?.qty === "number" ? it.qty : 1;
                    const image = it?.image ?? "/food-1.png";

                    return (
                      <div key={it.id} className="flex gap-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-zinc-100">
                          <Image src={image} alt={title} fill className="object-cover" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-[#ff4b2b]">
                            {title}
                          </p>

                          {!!desc && (
                            <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-zinc-500">
                              {desc}
                            </p>
                          )}

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-zinc-900">
                              <button
                                type="button"
                                onClick={() => dec(it.id)}
                                className="h-6 w-6 rounded-full bg-zinc-100"
                                aria-label="Decrease"
                              >
                                -
                              </button>

                              <span className="w-4 text-center">{qty}</span>

                              <button
                                type="button"
                                onClick={() => inc(it.id)}
                                className="h-6 w-6 rounded-full bg-zinc-100"
                                aria-label="Increase"
                              >
                                +
                              </button>
                            </div>

                            <p className="text-xs font-semibold text-zinc-900">
                              ${(price * qty).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(it.id)}
                          className="mt-1 h-6 w-6 rounded-full bg-zinc-100 text-zinc-700"
                          aria-label="Remove"
                        >
                          <X className="mx-auto h-3 w-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Delivery location (UI only) */}
          <div className="px-4 pt-4">
            <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <p className="text-xs font-semibold text-zinc-900">Delivery location</p>
              <div className="mt-2 rounded-lg border bg-white px-3 py-2 text-[11px] text-zinc-500">
                Please share your complete address
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="mt-auto px-4 pb-4 pt-4">
            <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
              <p className="text-xs font-semibold text-zinc-900">Payment info</p>

              <div className="mt-3 space-y-2 text-xs text-zinc-700">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span className="font-semibold text-zinc-900">
                    ${itemsTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-zinc-900">
                    ${items.length === 0 ? "0.00" : shipping.toFixed(2)}
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
                type="button"
                disabled={items.length === 0}
                className="mt-3 w-full rounded-full bg-[#ff4b2b] hover:bg-[#ff4b2b]/90 disabled:opacity-50"
                onClick={() => alert("Checkout (UI only)")}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
