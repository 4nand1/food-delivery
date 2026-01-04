"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type FoodItem = {
  id: string;
  title: string;
  price: number;
  desc: string;
  image: string;
};

export type CartItem = FoodItem & {
  qty: number; // quantity = хэдэн ширхэг
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: FoodItem) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;

  // ✅ useMemo тооцоонууд
  count: number;
  itemsTotal: number;
  shipping: number;
  total: number;

  // Drawer/Sheet state
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Order tab demo state (UI only)
  activeTab: "cart" | "order";
  setActiveTab: (t: "cart" | "order") => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"cart" | "order">("cart");

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

    // figma шиг: + дархад шууд нээгдэнэ, tab cart дээр байна
    setActiveTab("cart");
    setIsCartOpen(true);
  };

  const inc = (id: string) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: (x.qty ?? 0) + 1 } : x))
    );
  };

  const dec = (id: string) => {
    setItems((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        const nextQty = Math.max(1, (x.qty ?? 1) - 1);
        return { ...x, qty: nextQty };
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const clear = () => setItems([]);

  // ✅ useMemo: items өөрчлөгдөх үед л тооцоолно
  const count = useMemo(
    () => items.reduce((sum, x) => sum + (x?.qty ?? 0), 0),
    [items]
  );

  const itemsTotal = useMemo(
    () => items.reduce((sum, x) => sum + (x?.price ?? 0) * (x?.qty ?? 0), 0),
    [items]
  );

  const total = useMemo(() => {
    if (items.length === 0) return 0;
    return itemsTotal + shipping;
  }, [items.length, itemsTotal]);

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
    activeTab,
    setActiveTab,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider />");
  return ctx;
}
