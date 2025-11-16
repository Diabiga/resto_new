"use client";

import { create } from "zustand";

export type CartItem = {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  tableSlug: string | null;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  reset: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  tableSlug: null,
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.dishId === item.dishId);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.dishId === item.dishId
              ? { ...i, quantity: i.quantity + item.quantity }
              : i,
          ),
        };
      }
      return { ...state, items: [...state.items, item] };
    }),
  removeItem: (dishId) =>
    set((state) => ({
      ...state,
      items: state.items.filter((item) => item.dishId !== dishId),
    })),
  updateQuantity: (dishId, quantity) =>
    set((state) => ({
      ...state,
      items: state.items.map((item) =>
        item.dishId === dishId ? { ...item, quantity } : item,
      ),
    })),
  reset: () => set({ items: [], tableSlug: null }),
}));
