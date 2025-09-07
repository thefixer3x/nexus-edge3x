import React from 'react';
import {
  SMECard,
  SMECardContent,
  SMECardHeader,
  SMEButton,
  SMEBadge
} from '@/components/sme';
import {
  X,
  Star,
  ShoppingCart,
  Trash2,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  Scale
} from 'lucide-react';
import { useComparisonStore } from '@/stores/comparisonStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const ProductComparison: React.FC = () => {
  const {
    comparisonProducts,
    isComparisonOpen,
    setComparisonOpen,
    removeFromComparison,
    clearComparison
  } = useComparisonStore();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-seftec-gold fill-current' : 'text-sme-neutral-300'}`}
      />
    ));
  };

  const getBadgeVariant = (badgeType: string): 'primary' | 'secondary' | 'accent' | 'info' | 'warning' | 'success' => {
    switch (badgeType) {
      case 'best-seller': return 'primary';
      case 'new': return 'secondary';
      case 'sale': return 'accent';
      case 'premium': return 'info';
      case 'trending': return 'warning';
      case 'eco-friendly': return 'success';
      default: return 'primary';
    }
  };

  // Get all unique specification categories
  const getAllSpecCategories = () => {
    const categories = new Set<string>();
    comparisonProducts.forEach(product => {
      product.specifications.forEach(spec => {
        categories.add(spec.category);
      });
    });
    return Array.from(categories);
  };

  // Get specification value for a product in a category
  const getSpecValue = (product: Product, category: string, specName: string) => {
    const spec = product.specifications.find((s: Product['specifications'][0]) => s.category === category && s.name === specName);
    return spec ? spec.value : '-';
  };

  // Get all specification names for a category
  const getSpecsInCategory = (category: string) => {
    const specNames = new Set<string>();
    comparisonProducts.forEach(product => {
      product.specifications.forEach(spec => {
        if (spec.category === category) {
          specNames.add(spec.name);
        }
      });
    });
    return Array.from(specNames);
  };

  // Compare values to highlight differences
  const getComparisonClass = (values: string[]) => {
    const uniqueValues = new Set(values.filter(v => v !== '-'));
    if (uniqueValues.size > 1) {
      return 'bg-yellow-50 border-l-2 border-yellow-400';
    }
    return '';
  };

  if (comparisonProducts.length === 0) {
    return null;
  }

  return (
    <Dialog open={isComparisonOpen} onOpenChange={setComparisonOpen}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-2xl font-bold font-heading flex items-center">
            <Scale className="w-6 h-6 mr-2 text-seftec-purple" />
            Product Comparison
            <Badge variant="secondary" className="ml-3">
              {comparisonProducts.length} Product{comparisonProducts.length !== 1 ? 's' : ''}
            </Badge>
          </DialogTitle>
          <div className="flex items-center space-x-2">
            <SMEButton variant="outline" size="sm" onClick={clearComparison}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </SMEButton>
          </div>
        </DialogHeader>

        <div className="overflow-auto max-h-[calc(90vh-120px)]">
          {/* Product Headers */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {comparisonProducts.map((product) => (
              <SMECard key={product.id} className="relative">
                <button
                  onClick={() => removeFromComparison(product.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200 z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <SMECardHeader className="p-4">
                  <img
                    src={product.images[0]?.url || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {product.badges.slice(0, 2).map((badge, index) => (
                        <SMEBadge key={index} variant={getBadgeVariant(badge.type)} size="sm">
                          {badge.label}
                        </SMEBadge>
                      ))}
                    </div>
                    <h3 className="font-semibold text-sm leading-tight">{product.name}</h3>
                    <p className="text-xs text-sme-neutral-600">{product.brand}</p>
                  </div>
                </SMECardHeader>

                <SMECardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    {/* Price */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-seftec-purple">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-sme-neutral-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-xs text-sme-neutral-600">({product.reviewCount})</span>
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center space-x-2">
                      {product.inStock ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-700">In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-red-700">Out of Stock</span>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <SMEButton
                        variant="primary"
                        size="sm"
                        className="w-full"
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Add to Cart
                      </SMEButton>
                      <SMEButton variant="outline" size="sm" className="w-full">
                        View Details
                      </SMEButton>
                    </div>
                  </div>
                </SMECardContent>
              </SMECard>
            ))}
          </div>

          {/* Specifications Comparison */}
          <div className="space-y-6">
            {getAllSpecCategories().map((category) => {
              const specsInCategory = getSpecsInCategory(category);

              return (
                <div key={category} className="bg-white border border-sme-neutral-200 rounded-xl overflow-hidden">
                  <div className="bg-gradient-to-r from-seftec-purple to-seftec-mint px-4 py-3">
                    <h3 className="font-semibold text-white font-heading">{category}</h3>
                  </div>

                  <div className="divide-y divide-sme-neutral-100">
                    {specsInCategory.map((specName) => {
                      const values = comparisonProducts.map(product =>
                        getSpecValue(product, category, specName)
                      );
                      const comparisonClass = getComparisonClass(values);

                      return (
                        <div key={specName} className={cn('grid grid-cols-1 lg:grid-cols-4 gap-4 p-4', comparisonClass)}>
                          <div className="lg:col-span-1 font-medium text-sme-neutral-700 border-b lg:border-b-0 lg:border-r border-sme-neutral-200 pb-2 lg:pb-0 lg:pr-4">
                            {specName}
                          </div>
                          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {values.map((value, index) => (
                              <div
                                key={index}
                                className="text-sm text-sme-neutral-900 py-1 px-2 bg-sme-neutral-50 rounded"
                              >
                                {value}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Basic Information Comparison */}
          <div className="mt-6 bg-white border border-sme-neutral-200 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-seftec-mint to-seftec-gold px-4 py-3">
              <h3 className="font-semibold text-sme-neutral-900 font-heading">General Information</h3>
            </div>

            <div className="divide-y divide-sme-neutral-100">
              {/* Description */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
                <div className="lg:col-span-1 font-medium text-sme-neutral-700 border-b lg:border-b-0 lg:border-r border-sme-neutral-200 pb-2 lg:pb-0 lg:pr-4">
                  Description
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {comparisonProducts.map((product, index) => (
                    <div key={index} className="text-sm text-sme-neutral-700 py-1">
                      {product.shortDescription}
                    </div>
                  ))}
                </div>
              </div>

              {/* Warranty */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
                <div className="lg:col-span-1 font-medium text-sme-neutral-700 border-b lg:border-b-0 lg:border-r border-sme-neutral-200 pb-2 lg:pb-0 lg:pr-4">
                  Warranty
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {comparisonProducts.map((product, index) => (
                    <div key={index} className="text-sm text-sme-neutral-700 py-1">
                      {product.warranty || 'Standard warranty'}
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
                <div className="lg:col-span-1 font-medium text-sme-neutral-700 border-b lg:border-b-0 lg:border-r border-sme-neutral-200 pb-2 lg:pb-0 lg:pr-4">
                  Shipping
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {comparisonProducts.map((product, index) => (
                    <div key={index} className="text-sm text-sme-neutral-700 py-1">
                      {product.shippingInfo.freeShipping ? 'Free shipping' : `$${product.shippingInfo.shippingCost} shipping`}
                      <br />
                      <span className="text-xs text-sme-neutral-500">
                        {product.shippingInfo.estimatedDelivery}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
