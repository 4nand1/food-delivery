import { create } from "zustand";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  count: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item, qty = 1) =>
    set((state) => {
      const exist = state.items.find((x) => x.id === item.id);

      if (exist) {
        return {
          items: state.items.map((x) =>
            x.id === item.id ? { ...x, qty: Math.min(99, x.qty + qty) } : x
          ),
        };
      }

      return { items: [...state.items, { ...item, qty }] };
    }),

  count: () => get().items.reduce((sum, x) => sum + x.qty, 0),
}));
