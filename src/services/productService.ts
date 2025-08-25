import {
  Product,
  ProductSearchParams,
  ProductSearchResult,
  ProductCategory,
  ProductFilters
} from '@/types/product';

// Realistic business product data
const BUSINESS_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Dell OptiPlex 7090 Business Desktop',
    slug: 'dell-optiplex-7090-business-desktop',
    description: 'Powerful business desktop computer designed for professional environments. Features Intel Core i7 processor, 16GB RAM, 512GB SSD, and comprehensive security features including TPM 2.0 and Dell Data Protection. Perfect for demanding business applications, multitasking, and secure data handling.',
    shortDescription: 'High-performance business desktop with Intel Core i7, 16GB RAM, and enterprise security.',
    price: 1299.99,
    originalPrice: 1499.99,
    currency: 'USD',
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=800',
        alt: 'Dell OptiPlex 7090 Front View',
        isPrimary: true
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800',
        alt: 'Dell OptiPlex 7090 Side View',
        isPrimary: false
      },
      {
        id: '1-3',
        url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800',
        alt: 'Dell OptiPlex 7090 Setup',
        isPrimary: false
      }
    ],
    category: {
      id: 'computers',
      name: 'Computers & Laptops',
      slug: 'computers-laptops',
      level: 1
    },
    subcategory: 'Desktop Computers',
    brand: 'Dell',
    sku: 'DELL-OPT-7090-I7',
    rating: 4.8,
    reviewCount: 124,
    reviews: [
      {
        id: 'rev-1',
        userId: 'user-1',
        userName: 'Sarah Johnson',
        rating: 5,
        title: 'Excellent for business use',
        comment: 'Fast, reliable, and perfect for our office needs. Great security features.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 'rev-2',
        userId: 'user-2',
        userName: 'Mike Chen',
        rating: 4,
        title: 'Good performance',
        comment: 'Solid desktop computer. Setup was easy and performance is great.',
        date: '2024-01-10',
        verified: true
      }
    ],
    specifications: [
      { name: 'Processor', value: 'Intel Core i7-11700', category: 'Performance' },
      { name: 'Memory', value: '16GB DDR4', category: 'Performance' },
      { name: 'Storage', value: '512GB SSD', category: 'Storage' },
      { name: 'Graphics', value: 'Intel UHD Graphics 750', category: 'Performance' },
      { name: 'Operating System', value: 'Windows 11 Pro', category: 'Software' },
      { name: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.1', category: 'Connectivity' },
      { name: 'Warranty', value: '3 Years ProSupport', category: 'Support' }
    ],
    tags: ['desktop', 'business', 'intel', 'windows', 'professional'],
    badges: [
      { type: 'best-seller', label: 'Best Seller' },
      { type: 'sale', label: '13% Off' }
    ],
    inStock: true,
    stockQuantity: 45,
    minOrderQuantity: 1,
    maxOrderQuantity: 10,
    weight: 5.2,
    dimensions: { length: 29.2, width: 9.3, height: 30.8, unit: 'cm' },
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: '3-5 business days',
      expeditedAvailable: true
    },
    warranty: '3 years manufacturer warranty with ProSupport',
    returnPolicy: '30-day return policy',
    relatedProducts: ['2', '3'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
    isActive: true,
    isFeatured: true,
    seoTitle: 'Dell OptiPlex 7090 Business Desktop - High Performance Computer',
    seoDescription: 'Professional business desktop with Intel Core i7, 16GB RAM, and enterprise security.',
    businessCategory: 'Technology'
  },
  {
    id: '2',
    name: 'Herman Miller Aeron Ergonomic Office Chair',
    slug: 'herman-miller-aeron-ergonomic-office-chair',
    description: 'World-renowned ergonomic office chair designed for all-day comfort and support. Features advanced PostureFit SL technology, breathable mesh material, and fully adjustable components. Scientifically proven to improve posture and reduce fatigue during long work sessions.',
    shortDescription: 'Premium ergonomic office chair with PostureFit SL technology and breathable mesh design.',
    price: 1395.00,
    currency: 'USD',
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        alt: 'Herman Miller Aeron Chair Front View',
        isPrimary: true
      },
      {
        id: '2-2',
        url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800',
        alt: 'Herman Miller Aeron Chair Profile',
        isPrimary: false
      }
    ],
    category: {
      id: 'furniture',
      name: 'Office Furniture',
      slug: 'office-furniture',
      level: 1
    },
    subcategory: 'Office Chairs',
    brand: 'Herman Miller',
    sku: 'HM-AERON-B-GRA',
    rating: 4.9,
    reviewCount: 89,
    reviews: [
      {
        id: 'rev-3',
        userId: 'user-3',
        userName: 'David Wilson',
        rating: 5,
        title: 'Best chair I\'ve ever owned',
        comment: 'Worth every penny. My back pain is gone and I\'m more productive.',
        date: '2024-01-12',
        verified: true
      }
    ],
    specifications: [
      { name: 'Size', value: 'Size B (Medium)', category: 'Dimensions' },
      { name: 'Weight Capacity', value: '350 lbs', category: 'Capacity' },
      { name: 'Material', value: 'Breathable Mesh', category: 'Materials' },
      { name: 'Frame', value: 'Recycled Aluminum', category: 'Materials' },
      { name: 'Adjustability', value: 'Height, Tilt, Arms, Lumbar', category: 'Features' },
      { name: 'Warranty', value: '12 Years', category: 'Support' }
    ],
    tags: ['chair', 'ergonomic', 'herman-miller', 'office', 'premium'],
    badges: [
      { type: 'premium', label: 'Premium' },
      { type: 'eco-friendly', label: 'Eco-Friendly' }
    ],
    inStock: true,
    stockQuantity: 12,
    minOrderQuantity: 1,
    maxOrderQuantity: 5,
    weight: 19.1,
    dimensions: { length: 68.6, width: 68.6, height: 104.1, unit: 'cm' },
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: '7-10 business days',
      expeditedAvailable: false
    },
    warranty: '12-year warranty covering all mechanisms and materials',
    returnPolicy: '30-day return policy with free return shipping',
    relatedProducts: ['4', '6'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-14',
    isActive: true,
    isFeatured: true,
    businessCategory: 'Furniture'
  },
  {
    id: '3',
    name: 'HP LaserJet Pro MFP M428fdw Wireless Printer',
    slug: 'hp-laserjet-pro-mfp-m428fdw-wireless-printer',
    description: 'Professional all-in-one laser printer designed for small and medium businesses. Features high-speed printing, scanning, copying, and faxing capabilities with advanced security features and mobile printing support.',
    shortDescription: 'Professional wireless all-in-one laser printer with security features and mobile printing.',
    price: 329.99,
    originalPrice: 399.99,
    currency: 'USD',
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800',
        alt: 'HP LaserJet Pro MFP M428fdw Front View',
        isPrimary: true
      }
    ],
    category: {
      id: 'office-equipment',
      name: 'Office Equipment',
      slug: 'office-equipment',
      level: 1
    },
    subcategory: 'Printers & Scanners',
    brand: 'HP',
    sku: 'HP-LJ-M428FDW',
    rating: 4.6,
    reviewCount: 67,
    reviews: [],
    specifications: [
      { name: 'Print Speed', value: 'Up to 38 ppm', category: 'Performance' },
      { name: 'Print Resolution', value: 'Up to 4800 x 600 dpi', category: 'Quality' },
      { name: 'Paper Capacity', value: '350 sheets', category: 'Capacity' },
      { name: 'Connectivity', value: 'Wi-Fi, Ethernet, USB, NFC', category: 'Connectivity' },
      { name: 'Functions', value: 'Print, Scan, Copy, Fax', category: 'Features' },
      { name: 'Mobile Printing', value: 'HP Smart App, AirPrint, Mopria', category: 'Features' }
    ],
    tags: ['printer', 'laser', 'wireless', 'multifunction', 'business'],
    badges: [
      { type: 'sale', label: '18% Off' }
    ],
    inStock: true,
    stockQuantity: 28,
    minOrderQuantity: 1,
    maxOrderQuantity: 3,
    weight: 12.7,
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: '2-4 business days',
      expeditedAvailable: true
    },
    warranty: '1-year limited warranty',
    relatedProducts: ['1', '5'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-13',
    isActive: true,
    isFeatured: false,
    businessCategory: 'Office Equipment'
  },
  {
    id: '4',
    name: 'UPLIFT V2 Standing Desk 60" x 30"',
    slug: 'uplift-v2-standing-desk-60x30',
    description: 'Premium height-adjustable standing desk with memory presets and advanced stability. Features quiet motors, collision detection, and a 15-year warranty. Perfect for creating a healthy and productive workspace.',
    shortDescription: 'Premium height-adjustable standing desk with memory presets and 15-year warranty.',
    price: 699.99,
    currency: 'USD',
    images: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1631889993959-41b4c3c4bf81?w=800',
        alt: 'UPLIFT V2 Standing Desk',
        isPrimary: true
      }
    ],
    category: {
      id: 'furniture',
      name: 'Office Furniture',
      slug: 'office-furniture',
      level: 1
    },
    subcategory: 'Desks',
    brand: 'UPLIFT',
    sku: 'UPLIFT-V2-6030',
    rating: 4.9,
    reviewCount: 156,
    reviews: [],
    specifications: [
      { name: 'Dimensions', value: '60" W x 30" D', category: 'Size' },
      { name: 'Height Range', value: '25.3" - 50.9"', category: 'Adjustment' },
      { name: 'Weight Capacity', value: '355 lbs', category: 'Capacity' },
      { name: 'Memory Presets', value: '4 Positions', category: 'Features' },
      { name: 'Frame', value: 'Steel with Advanced Crossbar', category: 'Construction' },
      { name: 'Warranty', value: '15 Years', category: 'Support' }
    ],
    tags: ['desk', 'standing', 'adjustable', 'ergonomic', 'premium'],
    badges: [
      { type: 'premium', label: 'Premium' },
      { type: 'trending', label: 'Trending' }
    ],
    inStock: false,
    stockQuantity: 0,
    minOrderQuantity: 1,
    maxOrderQuantity: 2,
    weight: 45.4,
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: '10-14 business days',
      expeditedAvailable: false
    },
    warranty: '15-year warranty on frame and motors',
    relatedProducts: ['2', '6'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-16',
    isActive: true,
    isFeatured: true,
    businessCategory: 'Furniture'
  },
  {
    id: '5',
    name: 'Jabra Speak 750 Conference Speaker',
    slug: 'jabra-speak-750-conference-speaker',
    description: 'Professional conference speakerphone with superior audio quality and wireless connectivity. Features noise cancellation, 360-degree microphone pickup, and seamless integration with leading UC platforms.',
    shortDescription: 'Professional conference speaker with noise cancellation and 360-degree pickup.',
    price: 279.99,
    currency: 'USD',
    images: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800',
        alt: 'Jabra Speak 750 Conference Speaker',
        isPrimary: true
      }
    ],
    category: {
      id: 'audio-equipment',
      name: 'Audio Equipment',
      slug: 'audio-equipment',
      level: 1
    },
    subcategory: 'Conference Audio',
    brand: 'Jabra',
    sku: 'JABRA-SPEAK-750',
    rating: 4.7,
    reviewCount: 93,
    reviews: [],
    specifications: [
      { name: 'Coverage', value: 'Up to 6 people', category: 'Capacity' },
      { name: 'Connectivity', value: 'Bluetooth, USB-C', category: 'Connectivity' },
      { name: 'Battery Life', value: 'Up to 11 hours talk time', category: 'Power' },
      { name: 'Noise Cancellation', value: 'Advanced noise cancellation', category: 'Audio' },
      { name: 'Compatibility', value: 'Teams, Zoom, WebEx certified', category: 'Integration' }
    ],
    tags: ['speaker', 'conference', 'wireless', 'professional', 'collaboration'],
    badges: [],
    inStock: true,
    stockQuantity: 34,
    minOrderQuantity: 1,
    maxOrderQuantity: 5,
    weight: 0.55,
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: '2-3 business days',
      expeditedAvailable: true
    },
    warranty: '2-year manufacturer warranty',
    relatedProducts: ['1', '3'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-11',
    isActive: true,
    isFeatured: false,
    businessCategory: 'Technology'
  },
  {
    id: '6',
    name: 'Moleskine Professional Notebook Set',
    slug: 'moleskine-professional-notebook-set',
    description: 'Premium leather portfolio with integrated tablet holder and organizational compartments. Includes high-quality lined notebooks, pen holder, and business card slots. Perfect for executive meetings and professional presentations.',
    shortDescription: 'Premium leather portfolio with tablet holder and organizational compartments.',
    price: 129.99,
    currency: 'USD',
    images: [
      {
        id: '6-1',
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800',
        alt: 'Moleskine Professional Portfolio',
        isPrimary: true
      }
    ],
    category: {
      id: 'accessories',
      name: 'Business Accessories',
      slug: 'business-accessories',
      level: 1
    },
    subcategory: 'Portfolios & Cases',
    brand: 'Moleskine',
    sku: 'MOLESKIN-PRO-PORT',
    rating: 4.5,
    reviewCount: 78,
    reviews: [],
    specifications: [
      { name: 'Material', value: 'Genuine Leather', category: 'Construction' },
      { name: 'Size', value: '13" x 10" x 1.5"', category: 'Dimensions' },
      { name: 'Tablet Compatibility', value: 'Up to 12.9" tablets', category: 'Compatibility' },
      { name: 'Organization', value: 'Multiple pockets and slots', category: 'Features' },
      { name: 'Closure', value: 'Magnetic snap closure', category: 'Features' }
    ],
    tags: ['portfolio', 'leather', 'professional', 'organization', 'executive'],
    badges: [
      { type: 'trending', label: 'Trending' }
    ],
    inStock: true,
    stockQuantity: 22,
    minOrderQuantity: 1,
    maxOrderQuantity: 10,
    weight: 0.8,
    shippingInfo: {
      freeShipping: false,
      shippingCost: 9.99,
      estimatedDelivery: '3-5 business days',
      expeditedAvailable: true
    },
    warranty: '1-year warranty against manufacturing defects',
    relatedProducts: ['2', '4'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-09',
    isActive: true,
    isFeatured: false,
    businessCategory: 'Supplies'
  }
];

const CATEGORIES: ProductCategory[] = [
  { id: 'computers', name: 'Computers & Laptops', slug: 'computers-laptops', level: 1 },
  { id: 'furniture', name: 'Office Furniture', slug: 'office-furniture', level: 1 },
  { id: 'office-equipment', name: 'Office Equipment', slug: 'office-equipment', level: 1 },
  { id: 'audio-equipment', name: 'Audio Equipment', slug: 'audio-equipment', level: 1 },
  { id: 'accessories', name: 'Business Accessories', slug: 'business-accessories', level: 1 }
];

class ProductService {
  private static instance: ProductService;
  private products: Product[] = [...BUSINESS_PRODUCTS];

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  // Simulate API delay
  private async delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async searchProducts(params: ProductSearchParams = {}): Promise<ProductSearchResult> {
    await this.delay();

    let filteredProducts = [...this.products];

    // Apply search query
    if (params.query) {
      const query = params.query.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (params.filters) {
      filteredProducts = this.applyFilters(filteredProducts, params.filters);
    }

    // Apply sorting
    if (params.sortBy) {
      filteredProducts = this.sortProducts(filteredProducts, params.sortBy);
    }

    // Pagination
    const page = params.page || 1;
    const limit = params.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit),
      hasMore: endIndex < filteredProducts.length
    };
  }

  async getProductById(id: string): Promise<Product | null> {
    await this.delay();
    return this.products.find(product => product.id === id) || null;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    await this.delay();
    return this.products.find(product => product.slug === slug) || null;
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    await this.delay();
    const product = this.products.find(p => p.id === productId);
    if (!product) return [];

    const related = this.products.filter(p =>
      product.relatedProducts.includes(p.id) && p.isActive
    );

    return related.slice(0, limit);
  }

  async getFeaturedProducts(limit: number = 6): Promise<Product[]> {
    await this.delay();
    return this.products
      .filter(product => product.isFeatured && product.isActive)
      .slice(0, limit);
  }

  async getCategories(): Promise<ProductCategory[]> {
    await this.delay();
    return [...CATEGORIES];
  }

  private applyFilters(products: Product[], filters: ProductFilters): Product[] {
    let filtered = [...products];

    if (filters.category) {
      filtered = filtered.filter(p => p.category.slug === filters.category);
    }

    if (filters.brand) {
      filtered = filtered.filter(p => p.brand.toLowerCase() === filters.brand?.toLowerCase());
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p =>
        p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= filters.rating!);
    }

    if (filters.inStock !== undefined) {
      filtered = filtered.filter(p => p.inStock === filters.inStock);
    }

    if (filters.businessCategory) {
      filtered = filtered.filter(p => p.businessCategory === filters.businessCategory);
    }

    return filtered;
  }

  private sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'popularity':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      case 'name':
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}

export const productService = ProductService.getInstance();
