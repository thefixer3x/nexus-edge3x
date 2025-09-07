import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, TrendingUp, Zap, Award, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SMEButton } from '@/components/sme/SMEButton';
import { SMECard, SMECardContent } from '@/components/sme/SMECard';
import { SMEBadge } from '@/components/sme/SMEBadge';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  brand: string;
  badges: { type: string; label: string }[];
  category: string;
}

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for featured products
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Business Laptop Pro',
      description: 'High-performance laptop for professional use with 16GB RAM and 512GB SSD',
      price: 899.99,
      originalPrice: 999.99,
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop',
      brand: 'TechBrand',
      badges: [
        { type: 'best-seller', label: 'Best Seller' },
        { type: 'sale', label: '10% Off' }
      ],
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Ergonomic Office Chair',
      description: 'Premium ergonomic chair with lumbar support and adjustable height',
      price: 299.99,
      rating: 4.9,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1505798577913-8e4067c5422f?w=400&h=300&fit=crop',
      brand: 'ComfortPlus',
      badges: [
        { type: 'new', label: 'New' }
      ],
      category: 'Furniture'
    },
    {
      id: '3',
      name: 'Wireless Presentation Remote',
      description: 'Professional presentation remote with laser pointer and 100ft range',
      price: 49.99,
      originalPrice: 69.99,
      rating: 4.6,
      reviewCount: 56,
      image: 'https://images.unsplash.com/photo-1587821702403-0c449db2a917?w=400&h=300&fit=crop',
      brand: 'PresenterPro',
      badges: [
        { type: 'sale', label: 'Save $20' }
      ],
      category: 'Office Supplies'
    },
    {
      id: '4',
      name: 'Business Analytics Software',
      description: 'Comprehensive analytics suite for business intelligence and reporting',
      price: 199.99,
      rating: 4.7,
      reviewCount: 203,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      brand: 'DataInsights',
      badges: [
        { type: 'premium', label: 'Premium' },
        { type: 'trending', label: 'Trending' }
      ],
      category: 'Software'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 800);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-seftec-gold fill-current' : 'text-sme-neutral-300'}`}
      />
    ));
  };

  const getBadgeVariant = (badgeType: string) => {
    switch (badgeType) {
      case 'best-seller': return 'primary';
      case 'new': return 'secondary';
      case 'sale': return 'accent';
      case 'premium': return 'info';
      case 'trending': return 'warning';
      default: return 'primary';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <SMECard key={index} className="animate-pulse">
            <SMECardContent className="p-4">
              <div className="bg-sme-neutral-200 h-48 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-sme-neutral-200 rounded w-3/4"></div>
                <div className="h-3 bg-sme-neutral-200 rounded w-1/2"></div>
                <div className="h-6 bg-sme-neutral-200 rounded w-1/3"></div>
              </div>
            </SMECardContent>
          </SMECard>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold font-heading text-sme-neutral-900">Featured Products</h3>
        <SMEButton variant="ghost" asChild>
          <Link to="/products">
            View All Products
          </Link>
        </SMEButton>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <SMECard key={product.id} className="group hover:shadow-xl transition-all duration-300">
            <SMECardContent className="p-4">
              <div className="relative mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {product.badges.map((badge, index) => (
                    <SMEBadge key={index} variant={getBadgeVariant(badge.type)} size="sm">
                      {badge.label}
                    </SMEBadge>
                  ))}
                </div>
                <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200">
                  <Heart className="w-4 h-4 text-sme-neutral-400 hover:text-red-500" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold text-sme-neutral-900 line-clamp-2">{product.name}</h4>
                  <SMEBadge variant="info" size="sm">{product.brand}</SMEBadge>
                </div>
                
                <p className="text-sm text-sme-neutral-600 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center gap-1">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-xs text-sme-neutral-500">({product.reviewCount})</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
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
                
                <SMEButton variant="primary" size="sm" className="w-full mt-2" asChild>
                  <Link to={`/products/${product.id}`}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Link>
                </SMEButton>
              </div>
            </SMECardContent>
          </SMECard>
        ))}
      </div>
    </div>
  );
};