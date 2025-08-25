import React, { useState, useEffect } from 'react';
import { useUserStore } from '@/stores/userStore';
import {
  SMECard,
  SMECardHeader,
  SMECardContent,
  SMECardFooter,
  SMEButton,
  SMEBadge,
  SMESearchInput
} from '@/components/sme';
import { AIChatSupport } from '@/components/AIChatSupport';
import { AIProductRecommendations } from '@/components/AIProductRecommendations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Heart, ShoppingCart, Filter, Loader2, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, ProductSearchResult, ProductCategory } from '@/types/product';
import { productService } from '@/services/productService';
import { useComparisonStore } from '@/stores/comparisonStore';
import { useCartStore } from '@/stores/cartStore';
import { ProductComparison } from '@/components/ProductComparison';
import { ShoppingCart as CartComponent } from '@/components/ShoppingCart';

export default function ProductListing() {
  const user = useUserStore((state) => state.user);
  const { addToComparison, comparisonProducts } = useComparisonStore();
  const { addToCart } = useCartStore();
  const [searchResult, setSearchResult] = useState<ProductSearchResult | null>(null);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productsResult, categoriesResult] = await Promise.all([
          productService.searchProducts({
            page: currentPage,
            limit: 12,
            sortBy: sortBy as 'name' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'popularity'
          }),
          productService.getCategories()
        ]);

        setSearchResult(productsResult);
        setCategories(categoriesResult);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentPage, sortBy]);

  // Search and filter products
  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);
      try {
        const filters: { category?: string } = {};

        if (selectedCategory !== 'all') {
          filters.category = selectedCategory;
        }

        const result = await productService.searchProducts({
          query: searchTerm || undefined,
          filters: Object.keys(filters).length > 0 ? filters : undefined,
          sortBy: sortBy as 'name' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'popularity',
          page: currentPage,
          limit: 12
        });

        setSearchResult(result);
      } catch (error) {
        console.error('Failed to search products:', error);
      } finally {
        setLoading(false);
      }
    };

    searchProducts();
  }, [searchTerm, selectedCategory, sortBy, currentPage]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-sme-accent fill-current' : 'text-sme-neutral-300'}`}
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

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  if (loading && !searchResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sme-neutral-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-sme-primary mx-auto mb-4" />
          <p className="text-sme-neutral-600">Loading business products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sme-neutral-50 to-white">
      {/* Page Header */}
      <div className="bg-white border-b border-sme-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-sme-neutral-900 mb-2">
              Business Products
            </h1>
            <p className="text-sme-neutral-600">
              Professional solutions for your business needs
            </p>
          </div>

          {/* AI Recommendations */}
          <div className="mb-4">
            <AIProductRecommendations userId={user?.id} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <SMESearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for business products..."
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-sme-neutral-500" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 border-sme-neutral-200 focus:border-sme-primary">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 border-sme-neutral-200 focus:border-sme-primary">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {searchResult && (
            <div className="text-sm text-sme-neutral-600">
              Showing {searchResult.products.length} of {searchResult.total} products
              {searchTerm && ` for "${searchTerm}"`}
            </div>
          )}
        </div>

        {/* Products Grid */}
        {searchResult && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {searchResult.products.map((product) => (
              <SMECard
                key={product.id}
                variant="product"
                hoverable
                className="group animate-fade-in"
              >
                <SMECardHeader className="p-0 relative">
                  {product.badges.map((badge, index) => (
                    <div key={index} className="absolute top-3 left-3 z-10">
                      <SMEBadge variant={getBadgeVariant(badge.type)} size="sm">
                        {badge.label}
                      </SMEBadge>
                    </div>
                  ))}
                  <div className="absolute top-3 right-3 z-10">
                    <button className="p-2 rounded-full bg-white/80 hover:bg-white shadow-sm transition-colors duration-200">
                      <Heart className="w-4 h-4 text-sme-neutral-400 hover:text-red-500" />
                    </button>
                  </div>
                  <img
                    src={product.images[0]?.url || '/placeholder.svg'}
                    alt={product.images[0]?.alt || product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </SMECardHeader>

                <SMECardContent className="flex-1">
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-lg text-sme-neutral-900 line-clamp-2 flex-1">
                        {product.name}
                      </h3>
                      <SMEBadge variant="info" size="sm" className="ml-2 flex-shrink-0">
                        {product.brand}
                      </SMEBadge>
                    </div>
                    <p className="text-sm text-sme-neutral-600 line-clamp-2">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-sm text-sme-neutral-500 ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-sme-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-sme-neutral-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {!product.inStock && (
                      <SMEBadge variant="warning" size="sm">Out of Stock</SMEBadge>
                    )}
                  </div>
                </SMECardContent>

                <SMECardFooter className="flex-col space-y-2">
                  <SMEButton
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={!product.inStock}
                    onClick={() => product.inStock && addToCart(product, 1)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </SMEButton>

                  <div className="flex space-x-2">
                    <Link to={`/products/${product.slug}`} className="flex-1">
                      <SMEButton variant="outline" size="md" className="w-full">
                        View Details
                      </SMEButton>
                    </Link>
                    <SMEButton
                      variant="ghost"
                      size="md"
                      className="px-3"
                      onClick={() => addToComparison(product)}
                      disabled={comparisonProducts.some(p => p.id === product.id)}
                      title={comparisonProducts.some(p => p.id === product.id) ? "Already in comparison" : "Add to comparison"}
                    >
                      <Scale className="w-4 h-4" />
                    </SMEButton>
                  </div>
                </SMECardFooter>
              </SMECard>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {searchResult && searchResult.hasMore && (
          <div className="text-center">
            <SMEButton
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Products'
              )}
            </SMEButton>
          </div>
        )}

        {/* Empty State */}
        {searchResult && searchResult.products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-sme-neutral-400 mb-4">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-sme-neutral-700 mb-2">
              No products found
            </h3>
            <p className="text-sme-neutral-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <SMEButton
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </SMEButton>
          </div>
        )}
      </div>

      {/* AI Chat Support */}
      <AIChatSupport />

      {/* Product Comparison */}
      <ProductComparison />
    </div>
  );
}
