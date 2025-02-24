import { create } from 'zustand';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addProduct: (product: Product) => void;
  resetCart: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],

  addProduct: (product) =>
    set((state) => ({
      items: [...state.items, { product, quantity: 1 }],
    })),

  resetCart: () => set({ items: [] }),
}));
