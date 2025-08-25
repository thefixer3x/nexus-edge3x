import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/types/product';

interface ComparisonState {
  comparisonProducts: Product[];
  isComparisonOpen: boolean;
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  toggleComparison: () => void;
  setComparisonOpen: (open: boolean) => void;
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set, get) => ({
      comparisonProducts: [],
      isComparisonOpen: false,

      addToComparison: (product: Product) => {
        const { comparisonProducts } = get();

        // Check if product is already in comparison
        if (comparisonProducts.find(p => p.id === product.id)) {
          return;
        }

        // Limit to 4 products for better comparison layout
        if (comparisonProducts.length >= 4) {
          // Remove the first product and add the new one
          set({
            comparisonProducts: [...comparisonProducts.slice(1), product]
          });
        } else {
          set({
            comparisonProducts: [...comparisonProducts, product]
          });
        }
      },

      removeFromComparison: (productId: string) => {
        set(state => ({
          comparisonProducts: state.comparisonProducts.filter(p => p.id !== productId)
        }));
      },

      clearComparison: () => {
        set({ comparisonProducts: [], isComparisonOpen: false });
      },

      toggleComparison: () => {
        set(state => ({ isComparisonOpen: !state.isComparisonOpen }));
      },

      setComparisonOpen: (open: boolean) => {
        set({ isComparisonOpen: open });
      },
    }),
    {
      name: 'seftec-comparison-storage',
      partialize: (state) => ({
        comparisonProducts: state.comparisonProducts,
      }),
    }
  )
);
