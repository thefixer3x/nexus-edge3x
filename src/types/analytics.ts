export interface SalesMetric {
  period: string;
  revenue: number;
  orders: number;
  averageOrderValue: number;
  conversionRate: number;
}

export interface ProductPerformance {
  productId: string;
  productName: string;
  productImage: string;
  category: string;
  brand: string;
  views: number;
  orders: number;
  revenue: number;
  rating: number;
  stockLevel: number;
  conversionRate: number;
  addToCartRate: number;
}

export interface CustomerMetrics {
  totalCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  customerLifetimeValue: number;
  averageSessionDuration: number;
  bounceRate: number;
}

export interface CategoryAnalytics {
  categoryId: string;
  categoryName: string;
  revenue: number;
  orders: number;
  products: number;
  growthRate: number;
}

export interface GeographicData {
  region: string;
  country: string;
  orders: number;
  revenue: number;
  customers: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
}

export interface InventoryAlert {
  productId: string;
  productName: string;
  currentStock: number;
  minimumStock: number;
  alertType: 'low_stock' | 'out_of_stock' | 'overstock';
  daysUntilStockout?: number;
}

export interface AnalyticsDashboardData {
  salesMetrics: SalesMetric[];
  productPerformance: ProductPerformance[];
  customerMetrics: CustomerMetrics;
  categoryAnalytics: CategoryAnalytics[];
  geographicData: GeographicData[];
  trafficSources: TrafficSource[];
  inventoryAlerts: InventoryAlert[];
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  topSellingProducts: ProductPerformance[];
  recentOrders: number;
}

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

export interface AnalyticsFilters {
  dateRange: DateRange;
  category?: string;
  brand?: string;
  region?: string;
}
