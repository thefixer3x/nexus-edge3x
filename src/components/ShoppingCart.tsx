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
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
  CreditCard,
  Truck,
  Tag,
  ArrowRight
} from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const ShoppingCart: React.FC = () => {
  const {
    items,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTax,
    getTotal,
    getItemCount,
    shippingCost
  } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Shopping Cart
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="w-24 h-24 bg-sme-neutral-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-12 h-12 text-sme-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-sme-neutral-700 mb-2">
              Your cart is empty
            </h3>
            <p className="text-sme-neutral-500 mb-6">
              Add some products to get started
            </p>
            <Link to="/products">
              <SMEButton variant="primary" onClick={() => setCartOpen(false)}>
                Continue Shopping
              </SMEButton>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Shopping Cart
              <Badge variant="secondary" className="ml-2">
                {getItemCount()} item{getItemCount() !== 1 ? 's' : ''}
              </Badge>
            </div>
            <SMEButton variant="ghost" size="sm" onClick={clearCart}>
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </SMEButton>
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.map((item) => (
            <SMECard key={`${item.product.id}-${item.selectedVariant || ''}`} className="relative">
              <SMECardContent className="p-4">
                <div className="flex space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.images[0]?.url || '/placeholder.svg'}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm text-sme-neutral-900 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-sme-neutral-600">{item.product.brand}</p>
                        {item.selectedVariant && (
                          <p className="text-xs text-sme-neutral-500">
                            Variant: {item.selectedVariant}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-sme-neutral-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-seftec-purple">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                          <span className="text-xs text-sme-neutral-400 line-through">
                            {formatPrice(item.product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-md border border-sme-neutral-300 hover:bg-sme-neutral-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-md border border-sme-neutral-300 hover:bg-sme-neutral-100 transition-colors"
                          disabled={item.product.maxOrderQuantity ? item.quantity >= item.product.maxOrderQuantity : false}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-2 text-right">
                      <span className="text-sm font-semibold text-sme-neutral-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </SMECardContent>
            </SMECard>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="border-t border-sme-neutral-200 pt-4 space-y-4">
          {/* Shipping Information */}
          <div className="flex items-center space-x-2 text-sm">
            <Truck className="w-4 h-4 text-seftec-mint" />
            <span className="text-sme-neutral-600">
              {shippingCost === 0 ? (
                <span className="text-green-600 font-medium">Free shipping!</span>
              ) : (
                <span>
                  {formatPrice(100 - getSubtotal())} more for free shipping
                </span>
              )}
            </span>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-sme-neutral-600">Subtotal</span>
              <span className="font-medium">{formatPrice(getSubtotal())}</span>
            </div>

            {shippingCost > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-sme-neutral-600">Shipping</span>
                <span className="font-medium">{formatPrice(shippingCost)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-sme-neutral-600">Tax</span>
              <span className="font-medium">{formatPrice(getTax())}</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-seftec-purple">{formatPrice(getTotal())}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/checkout" onClick={() => setCartOpen(false)}>
              <SMEButton variant="primary" size="lg" className="w-full">
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </SMEButton>
            </Link>

            <Link to="/products" onClick={() => setCartOpen(false)}>
              <SMEButton variant="outline" size="md" className="w-full">
                Continue Shopping
              </SMEButton>
            </Link>
          </div>

          {/* Promotional Message */}
          <div className="bg-gradient-to-r from-seftec-mint/20 to-seftec-gold/20 p-3 rounded-lg">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-seftec-purple" />
              <span className="text-xs text-sme-neutral-700">
                <strong>Business Discount:</strong> Save 10% on orders over $500
              </span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
