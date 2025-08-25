import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  SMECard,
  SMECardContent,
  SMEButton,
  SMEBadge
} from '@/components/sme';
import {
  Star,
  Heart,
  ShoppingCart,
  Shield,
  Truck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  User,
  Calendar,
  CheckCircle,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { Product } from '@/types/product';
import { productService } from '@/services/productService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        const productData = await productService.getProductBySlug(slug);
        if (!productData) {
          navigate('/products');
          return;
        }

        setProduct(productData);

        // Load related products
        const related = await productService.getRelatedProducts(productData.id);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Failed to load product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug, navigate]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-sme-accent fill-current' : 'text-sme-neutral-300'}`}
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

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && (!product?.maxOrderQuantity || newQuantity <= product.maxOrderQuantity)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sme-neutral-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-sme-primary mx-auto mb-4" />
          <p className="text-sme-neutral-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sme-neutral-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-sme-neutral-800 mb-4">Product not found</h2>
          <Link to="/products">
            <SMEButton variant="primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </SMEButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sme-neutral-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-sme-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-sme-neutral-600">
            <Link to="/products" className="hover:text-sme-primary">Products</Link>
            <span>/</span>
            <Link to={`/products?category=${product.category.slug}`} className="hover:text-sme-primary">
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-sme-neutral-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[selectedImageIndex]?.url || '/placeholder.svg'}
                alt={product.images[selectedImageIndex]?.alt || product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-lg"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors duration-200"
                    disabled={selectedImageIndex === 0}
                  >
                    <ChevronLeft className="w-5 h-5 text-sme-neutral-700" />
                  </button>
                  <button
                    onClick={() => setSelectedImageIndex(Math.min(product.images.length - 1, selectedImageIndex + 1))}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-md transition-colors duration-200"
                    disabled={selectedImageIndex === product.images.length - 1}
                  >
                    <ChevronRight className="w-5 h-5 text-sme-neutral-700" />
                  </button>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      index === selectedImageIndex ? 'border-sme-primary' : 'border-sme-neutral-200'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.badges.map((badge, index) => (
                  <SMEBadge key={index} variant={getBadgeVariant(badge.type)} size="sm">
                    {badge.label}
                  </SMEBadge>
                ))}
                <SMEBadge variant="info" size="sm">{product.brand}</SMEBadge>
              </div>
              <h1 className="text-3xl font-bold text-sme-neutral-900 mb-2">{product.name}</h1>
              <p className="text-lg text-sme-neutral-600">{product.shortDescription}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
                <span className="text-lg font-medium text-sme-neutral-800 ml-2">{product.rating}</span>
              </div>
              <span className="text-sme-neutral-600">({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-sme-primary">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-sme-neutral-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-700 font-medium">In Stock ({product.stockQuantity} available)</span>
                </>
              ) : (
                <>
                  <div className="w-5 h-5 rounded-full bg-red-500" />
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            {product.inStock && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-sme-neutral-700">Quantity:</label>
                  <div className="flex items-center border border-sme-neutral-200 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-sme-neutral-100 transition-colors duration-200"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x border-sme-neutral-200">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-sme-neutral-100 transition-colors duration-200"
                      disabled={product.maxOrderQuantity ? quantity >= product.maxOrderQuantity : false}
                    >
                      +
                    </button>
                  </div>
                  {product.minOrderQuantity > 1 && (
                    <span className="text-sm text-sme-neutral-600">
                      Min order: {product.minOrderQuantity}
                    </span>
                  )}
                </div>

                <div className="flex space-x-4">
                  <SMEButton variant="primary" size="lg" className="flex-1">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </SMEButton>
                  <SMEButton variant="outline" size="lg">
                    <Heart className="w-5 h-5" />
                  </SMEButton>
                </div>
              </div>
            )}

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-sme-neutral-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sme-primary/10 rounded-lg">
                  <Truck className="w-5 h-5 text-sme-primary" />
                </div>
                <div>
                  <div className="font-medium text-sme-neutral-900">
                    {product.shippingInfo.freeShipping ? 'Free Shipping' : `$${product.shippingInfo.shippingCost} Shipping`}
                  </div>
                  <div className="text-sm text-sme-neutral-600">{product.shippingInfo.estimatedDelivery}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sme-secondary/10 rounded-lg">
                  <Shield className="w-5 h-5 text-sme-secondary" />
                </div>
                <div>
                  <div className="font-medium text-sme-neutral-900">Warranty</div>
                  <div className="text-sm text-sme-neutral-600">{product.warranty || 'Standard warranty'}</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sme-accent/10 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-sme-accent" />
                </div>
                <div>
                  <div className="font-medium text-sme-neutral-900">Returns</div>
                  <div className="text-sm text-sme-neutral-600">{product.returnPolicy || '30-day returns'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <SMECard className="mb-12">
          <SMECardContent className="p-0">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
                <TabsTrigger value="shipping" className="hidden lg:block">Shipping & Returns</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="p-6">
                <div className="prose max-w-none">
                  <p className="text-sme-neutral-700 leading-relaxed">{product.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(
                    product.specifications.reduce((acc, spec) => {
                      if (!acc[spec.category]) acc[spec.category] = [];
                      acc[spec.category].push(spec);
                      return acc;
                    }, {} as Record<string, typeof product.specifications>)
                  ).map(([category, specs]) => (
                    <div key={category}>
                      <h3 className="text-lg font-semibold text-sme-neutral-900 mb-3">{category}</h3>
                      <div className="space-y-2">
                        {specs.map((spec, index) => (
                          <div key={index} className="flex justify-between py-2 border-b border-sme-neutral-100">
                            <span className="text-sme-neutral-600">{spec.name}</span>
                            <span className="text-sme-neutral-900 font-medium">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                {product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-sme-neutral-100 pb-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-sme-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-sme-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-sme-neutral-900">{review.userName}</div>
                              <div className="flex items-center space-x-2 text-sm text-sme-neutral-600">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(review.date).toLocaleDateString()}</span>
                                {review.verified && (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    <span className="text-green-600">Verified Purchase</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <h4 className="font-medium text-sme-neutral-900 mb-2">{review.title}</h4>
                        <p className="text-sme-neutral-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sme-neutral-600">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="shipping" className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-sme-neutral-900 mb-4">Shipping Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sme-neutral-600">Standard Shipping</span>
                        <span className="text-sme-neutral-900">
                          {product.shippingInfo.freeShipping ? 'Free' : `$${product.shippingInfo.shippingCost}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sme-neutral-600">Estimated Delivery</span>
                        <span className="text-sme-neutral-900">{product.shippingInfo.estimatedDelivery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sme-neutral-600">Expedited Available</span>
                        <span className="text-sme-neutral-900">
                          {product.shippingInfo.expeditedAvailable ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-sme-neutral-900 mb-4">Return Policy</h3>
                    <p className="text-sme-neutral-700">{product.returnPolicy}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </SMECardContent>
        </SMECard>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-sme-neutral-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <SMECard key={relatedProduct.id} variant="product" hoverable>
                  <SMECardContent className="p-4">
                    <Link to={`/products/${relatedProduct.slug}`}>
                      <img
                        src={relatedProduct.images[0]?.url || '/placeholder.svg'}
                        alt={relatedProduct.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-medium text-sme-neutral-900 mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sme-primary">${relatedProduct.price.toFixed(2)}</span>
                        <div className="flex items-center space-x-1">
                          {renderStars(relatedProduct.rating)}
                        </div>
                      </div>
                    </Link>
                  </SMECardContent>
                </SMECard>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
