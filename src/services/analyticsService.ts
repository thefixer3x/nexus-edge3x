import {
  AnalyticsDashboardData,
  SalesMetric,
  ProductPerformance,
  CustomerMetrics,
  CategoryAnalytics,
  GeographicData,
  TrafficSource,
  InventoryAlert,
  AnalyticsFilters,
  DateRange
} from '@/types/analytics';
import { productService } from './productService';

class AnalyticsService {
  private static instance: AnalyticsService;

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  // Simulate API delay
  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generate date ranges
  private generateDateRanges(): DateRange[] {
    const now = new Date();
    return [
      {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
        end: now,
        label: 'Last 7 days'
      },
      {
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30),
        end: now,
        label: 'Last 30 days'
      },
      {
        start: new Date(now.getFullYear(), now.getMonth() - 3, now.getDate()),
        end: now,
        label: 'Last 3 months'
      },
      {
        start: new Date(now.getFullYear(), 0, 1),
        end: now,
        label: 'This year'
      }
    ];
  }

  // Generate sales metrics for the last 30 days
  private generateSalesMetrics(): SalesMetric[] {
    const metrics: SalesMetric[] = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      const baseRevenue = 2000 + Math.random() * 3000;
      const baseOrders = 15 + Math.random() * 25;

      // Add weekly patterns (higher on weekdays)
      const dayOfWeek = date.getDay();
      const weekdayMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1.2;

      const revenue = Math.round(baseRevenue * weekdayMultiplier);
      const orders = Math.round(baseOrders * weekdayMultiplier);

      metrics.push({
        period: date.toISOString().split('T')[0],
        revenue,
        orders,
        averageOrderValue: revenue / orders,
        conversionRate: 2.5 + Math.random() * 2
      });
    }

    return metrics;
  }

  // Generate product performance data
  private async generateProductPerformance(): Promise<ProductPerformance[]> {
    const searchResult = await productService.searchProducts({ limit: 50 });

    return searchResult.products.map(product => ({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0]?.url || '/placeholder.svg',
      category: product.category.name,
      brand: product.brand,
      views: Math.floor(500 + Math.random() * 2000),
      orders: Math.floor(10 + Math.random() * 100),
      revenue: Math.floor((10 + Math.random() * 100) * product.price),
      rating: product.rating,
      stockLevel: product.stockQuantity,
      conversionRate: 1 + Math.random() * 4,
      addToCartRate: 5 + Math.random() * 15
    }));
  }

  // Generate customer metrics
  private generateCustomerMetrics(): CustomerMetrics {
    return {
      totalCustomers: 1247,
      newCustomers: 89,
      returningCustomers: 156,
      customerLifetimeValue: 1250.75,
      averageSessionDuration: 4.5, // minutes
      bounceRate: 32.8 // percentage
    };
  }

  // Generate category analytics
  private generateCategoryAnalytics(): CategoryAnalytics[] {
    return [
      {
        categoryId: 'computers',
        categoryName: 'Computers & Laptops',
        revenue: 45890,
        orders: 78,
        products: 12,
        growthRate: 15.2
      },
      {
        categoryId: 'furniture',
        categoryName: 'Office Furniture',
        revenue: 32150,
        orders: 45,
        products: 8,
        growthRate: 8.7
      },
      {
        categoryId: 'office-equipment',
        categoryName: 'Office Equipment',
        revenue: 28920,
        orders: 92,
        products: 15,
        growthRate: 12.1
      },
      {
        categoryId: 'audio-equipment',
        categoryName: 'Audio Equipment',
        revenue: 15670,
        orders: 34,
        products: 6,
        growthRate: 22.3
      },
      {
        categoryId: 'accessories',
        categoryName: 'Business Accessories',
        revenue: 9840,
        orders: 67,
        products: 18,
        growthRate: 5.9
      }
    ];
  }

  // Generate geographic data
  private generateGeographicData(): GeographicData[] {
    return [
      { region: 'North America', country: 'United States', orders: 234, revenue: 67890, customers: 156 },
      { region: 'North America', country: 'Canada', orders: 45, revenue: 12340, customers: 34 },
      { region: 'Europe', country: 'United Kingdom', orders: 67, revenue: 18920, customers: 45 },
      { region: 'Europe', country: 'Germany', orders: 43, revenue: 15670, customers: 32 },
      { region: 'Europe', country: 'France', orders: 29, revenue: 9840, customers: 23 },
      { region: 'Asia Pacific', country: 'Australia', orders: 38, revenue: 11250, customers: 28 },
      { region: 'Asia Pacific', country: 'Singapore', orders: 22, revenue: 7890, customers: 18 }
    ];
  }

  // Generate traffic sources
  private generateTrafficSources(): TrafficSource[] {
    return [
      {
        source: 'Direct',
        visitors: 2847,
        conversions: 89,
        revenue: 23450,
        conversionRate: 3.1
      },
      {
        source: 'Google Search',
        visitors: 1923,
        conversions: 76,
        revenue: 19230,
        conversionRate: 3.9
      },
      {
        source: 'LinkedIn',
        visitors: 1245,
        conversions: 45,
        revenue: 15670,
        conversionRate: 3.6
      },
      {
        source: 'Email Campaign',
        visitors: 892,
        conversions: 67,
        revenue: 21890,
        conversionRate: 7.5
      },
      {
        source: 'Referral',
        visitors: 634,
        conversions: 23,
        revenue: 8920,
        conversionRate: 3.6
      },
      {
        source: 'Social Media',
        visitors: 423,
        conversions: 12,
        revenue: 4560,
        conversionRate: 2.8
      }
    ];
  }

  // Generate inventory alerts
  private async generateInventoryAlerts(): Promise<InventoryAlert[]> {
    const searchResult = await productService.searchProducts({ limit: 20 });
    const alerts: InventoryAlert[] = [];

    searchResult.products.forEach(product => {
      if (product.stockQuantity <= 5) {
        alerts.push({
          productId: product.id,
          productName: product.name,
          currentStock: product.stockQuantity,
          minimumStock: 10,
          alertType: product.stockQuantity === 0 ? 'out_of_stock' : 'low_stock',
          daysUntilStockout: product.stockQuantity > 0 ? Math.floor(product.stockQuantity / 2) : undefined
        });
      } else if (product.stockQuantity > 100) {
        alerts.push({
          productId: product.id,
          productName: product.name,
          currentStock: product.stockQuantity,
          minimumStock: 10,
          alertType: 'overstock'
        });
      }
    });

    return alerts.slice(0, 10); // Limit to 10 alerts
  }

  // Main method to get dashboard data
  async getDashboardData(filters?: AnalyticsFilters): Promise<AnalyticsDashboardData> {
    await this.delay();

    const [productPerformance, inventoryAlerts] = await Promise.all([
      this.generateProductPerformance(),
      this.generateInventoryAlerts()
    ]);

    const salesMetrics = this.generateSalesMetrics();
    const customerMetrics = this.generateCustomerMetrics();
    const categoryAnalytics = this.generateCategoryAnalytics();
    const geographicData = this.generateGeographicData();
    const trafficSources = this.generateTrafficSources();

    // Calculate totals
    const totalRevenue = salesMetrics.reduce((sum, metric) => sum + metric.revenue, 0);
    const totalOrders = salesMetrics.reduce((sum, metric) => sum + metric.orders, 0);
    const averageOrderValue = totalRevenue / totalOrders;

    // Get top selling products
    const topSellingProducts = productPerformance
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      salesMetrics,
      productPerformance,
      customerMetrics,
      categoryAnalytics,
      geographicData,
      trafficSources,
      inventoryAlerts,
      totalRevenue,
      totalOrders,
      totalCustomers: customerMetrics.totalCustomers,
      averageOrderValue,
      topSellingProducts,
      recentOrders: Math.floor(5 + Math.random() * 15)
    };
  }

  // Get available date ranges
  getDateRanges(): DateRange[] {
    return this.generateDateRanges();
  }

  // Get sales data for specific period
  async getSalesData(filters: AnalyticsFilters): Promise<SalesMetric[]> {
    await this.delay(200);
    return this.generateSalesMetrics();
  }

  // Get product performance data
  async getProductPerformanceData(filters?: AnalyticsFilters): Promise<ProductPerformance[]> {
    await this.delay(300);
    return await this.generateProductPerformance();
  }
}

export const analyticsService = AnalyticsService.getInstance();
