export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface ProductSpecification {
  name: string;
  value: string;
  category: string;
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  sku: string;
  inStock: boolean;
  quantity: number;
  attributes: Record<string, string>; // color, size, etc.
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: ProductImage[];
  category: ProductCategory;
  subcategory?: string;
  brand: string;
  sku: string;
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  specifications: ProductSpecification[];
  variants?: ProductVariant[];
  tags: string[];
  badges: ProductBadge[];
  inStock: boolean;
  stockQuantity: number;
  minOrderQuantity: number;
  maxOrderQuantity?: number;
  weight?: number;
  dimensions?: ProductDimensions;
  shippingInfo: ShippingInfo;
  warranty?: string;
  returnPolicy?: string;
  relatedProducts: string[]; // product IDs
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  businessCategory: 'Office Equipment' | 'Technology' | 'Furniture' | 'Services' | 'Supplies';
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  level: number;
}

export interface ProductBadge {
  type: 'best-seller' | 'new' | 'sale' | 'premium' | 'trending' | 'limited' | 'eco-friendly';
  label: string;
  color?: string;
}

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'inch';
}

export interface ShippingInfo {
  freeShipping: boolean;
  shippingCost?: number;
  estimatedDelivery: string;
  expeditedAvailable: boolean;
  restrictions?: string[];
}

export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
  businessCategory?: string;
  tags?: string[];
}

export interface ProductSearchParams {
  query?: string;
  filters?: ProductFilters;
  sortBy?: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'popularity';
  page?: number;
  limit?: number;
}

export interface ProductSearchResult {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
