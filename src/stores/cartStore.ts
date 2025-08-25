import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
  addedAt: Date;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  taxRate: number;

  // Actions
  addToCart: (product: Product, quantity: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;

  // Computed values
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      totalItems: 0,
      totalPrice: 0,
      shippingCost: 0,
      taxRate: 0.08, // 8% tax rate

      addToCart: (product: Product, quantity: number = 1, variant?: string) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => item.product.id === product.id && item.selectedVariant === variant
        );

        if (existingItemIndex > -1) {
          // Update existing item quantity
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartItem = {
            product,
            quantity,
            selectedVariant: variant,
            addedAt: new Date()
          };
          set({ items: [...items, newItem] });
        }

        // Update totals
        get().updateTotals();
      },

      removeFromCart: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
        get().updateTotals();
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
        get().updateTotals();
      },

      clearCart: () => {
        set({
          items: [],
          totalItems: 0,
          totalPrice: 0,
          isCartOpen: false
        });
      },

      toggleCart: () => {
        set(state => ({ isCartOpen: !state.isCartOpen }));
      },

      setCartOpen: (open: boolean) => {
        set({ isCartOpen: open });
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          const price = item.product.originalPrice && item.product.originalPrice < item.product.price
            ? item.product.originalPrice
            : item.product.price;
          return total + (price * item.quantity);
        }, 0);
      },

      getTax: () => {
        const { taxRate } = get();
        return get().getSubtotal() * taxRate;
      },

      getTotal: () => {
        const { shippingCost } = get();
        return get().getSubtotal() + get().getTax() + shippingCost;
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => count + item.quantity, 0);
      },

      // Internal method to update totals
      updateTotals: () => {
        const state = get();
        const itemCount = state.getItemCount();
        const subtotal = state.getSubtotal();

        // Calculate shipping cost (free shipping over $100)
        const newShippingCost = subtotal > 100 ? 0 : 9.99;

        set({
          totalItems: itemCount,
          totalPrice: subtotal,
          shippingCost: newShippingCost
        });
      },
    }),
    {
      name: 'seftec-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
        shippingCost: state.shippingCost,
      }),
    }
  )
);
