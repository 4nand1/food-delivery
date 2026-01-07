"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import CartDrawer from "@/app/_components/cart/CartDrawer";

export type FoodItem = {
  id: string;
  title: string;
  price: number;
  desc: string;
  image: string;
};

export type CartItem = FoodItem & {
  qty: number;
};

type CartContextType = {
  items: CartItem[];

  addToCart: (item: FoodItem) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;

  // ✅ useMemo totals
  count: number;
  itemsTotal: number;
  shipping: number;
  total: number;

  // ✅ Drawer state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const shipping = 0.99;

  const addToCart = (item: FoodItem) => {
    if (!item?.id) return;

    setItems((prev) => {
      const found = prev.find((x) => x.id === item.id);
      if (found) {
        return prev.map((x) => (x.id === item.id ? { ...x, qty: x.qty + 1 } : x));
      }
      return [...prev, { ...item, qty: 1 }];
    });

    // figma шиг: add дархад cart нээгдэнэ
    setIsCartOpen(true);
  };

  const inc = (id: string) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));
  };

  const dec = (id: string) => {
    setItems((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        const nextQty = Math.max(1, x.qty - 1);
        return { ...x, qty: nextQty };
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, x) => sum + x.qty, 0), [items]);

  const itemsTotal = useMemo(
    () => items.reduce((sum, x) => sum + x.price * x.qty, 0),
    [items]
  );

  const total = useMemo(() => (items.length === 0 ? 0 : itemsTotal + shipping), [
    items.length,
    itemsTotal,
  ]);

  const value: CartContextType = {
    items,
    addToCart,
    inc,
    dec,
    removeItem,
    clear,
    count,
    itemsTotal,
    shipping,
    total,
    isCartOpen,
    setIsCartOpen,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      {/* ✅ Drawer-г provider дотор mount хийнэ */}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider />");
  return ctx;
}
