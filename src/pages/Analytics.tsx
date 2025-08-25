import React, { useState, useEffect } from 'react';
import {
  SMECard,
  SMECardContent,
  SMECardHeader,
  SMEButton,
  SMEBadge
} from '@/components/sme';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
  BarChart3,
  PieChart,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  Download,
  Loader2,
  Eye,
  Star
} from 'lucide-react';
import { analyticsService } from '@/services/analyticsService';
import { AnalyticsDashboardData, DateRange } from '@/types/analytics';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export default function Analytics() {
  const [dashboardData, setDashboardData] = useState<AnalyticsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState('Last 30 days');
  const [dateRanges] = useState<DateRange[]>(analyticsService.getDateRanges());

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const data = await analyticsService.getDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to load analytics data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [selectedDateRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sme-neutral-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-seftec-purple mx-auto mb-4" />
          <p className="text-sme-neutral-600">Loading analytics dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sme-neutral-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-sme-neutral-800 mb-4">Failed to load analytics</h2>
          <SMEButton variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </SMEButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sme-neutral-50 to-white">
      {/* Page Header */}
      <div className="bg-white border-b border-sme-neutral-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl font-bold font-heading text-sme-neutral-900 mb-2">
                Business Analytics
              </h1>
              <p className="text-sme-neutral-600">
                Monitor your business performance, track sales trends, and optimize operations
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sme-neutral-500" />
                <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRanges.map(range => (
                      <SelectItem key={range.label} value={range.label}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <SMEButton variant="outline" size="md">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </SMEButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Revenue */}
          <SMECard className="bg-gradient-to-r from-seftec-purple to-seftec-mint text-white">
            <SMECardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium opacity-90">Total Revenue</div>
              <DollarSign className="w-5 h-5 opacity-90" />
            </SMECardHeader>
            <SMECardContent>
              <div className="text-2xl font-bold mb-1">
                {formatCurrency(dashboardData.totalRevenue)}
              </div>
              <div className="flex items-center text-sm opacity-90">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% from last month
              </div>
            </SMECardContent>
          </SMECard>

          {/* Total Orders */}
          <SMECard>
            <SMECardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-sme-neutral-600">Total Orders</div>
              <ShoppingCart className="w-5 h-5 text-seftec-purple" />
            </SMECardHeader>
            <SMECardContent>
              <div className="text-2xl font-bold text-sme-neutral-900 mb-1">
                {dashboardData.totalOrders.toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8.3% from last month
              </div>
            </SMECardContent>
          </SMECard>

          {/* Average Order Value */}
          <SMECard>
            <SMECardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-sme-neutral-600">Avg Order Value</div>
              <BarChart3 className="w-5 h-5 text-seftec-mint" />
            </SMECardHeader>
            <SMECardContent>
              <div className="text-2xl font-bold text-sme-neutral-900 mb-1">
                {formatCurrency(dashboardData.averageOrderValue)}
              </div>
              <div className="flex items-center text-sm text-red-600">
                <TrendingDown className="w-4 h-4 mr-1" />
                -2.1% from last month
              </div>
            </SMECardContent>
          </SMECard>

          {/* Total Customers */}
          <SMECard>
            <SMECardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="text-sm font-medium text-sme-neutral-600">Total Customers</div>
              <Users className="w-5 h-5 text-seftec-gold" />
            </SMECardHeader>
            <SMECardContent>
              <div className="text-2xl font-bold text-sme-neutral-900 mb-1">
                {dashboardData.totalCustomers.toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +5.7% from last month
              </div>
            </SMECardContent>
          </SMECard>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Trend Chart */}
          <SMECard>
            <SMECardHeader>
              <h3 className="text-lg font-semibold font-heading">Sales Trend (Last 30 Days)</h3>
            </SMECardHeader>
            <SMECardContent>
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-seftec-purple/5 to-seftec-mint/5 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-seftec-purple mx-auto mb-2" />
                  <p className="text-sme-neutral-600">Interactive chart visualization</p>
                  <p className="text-sm text-sme-neutral-500">Revenue trending upward with consistent growth</p>
                </div>
              </div>
            </SMECardContent>
          </SMECard>

          {/* Category Performance */}
          <SMECard>
            <SMECardHeader>
              <h3 className="text-lg font-semibold font-heading">Category Performance</h3>
            </SMECardHeader>
            <SMECardContent>
              <div className="space-y-4">
                {dashboardData.categoryAnalytics.map((category) => (
                  <div key={category.categoryId} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sme-neutral-900">{category.categoryName}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{formatCurrency(category.revenue)}</span>
                        <SMEBadge
                          variant={category.growthRate > 10 ? 'success' : category.growthRate > 5 ? 'warning' : 'secondary'}
                          size="sm"
                        >
                          {category.growthRate > 0 ? '+' : ''}{formatPercentage(category.growthRate)}
                        </SMEBadge>
                      </div>
                    </div>
                    <Progress
                      value={(category.revenue / Math.max(...dashboardData.categoryAnalytics.map(c => c.revenue))) * 100}
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-sme-neutral-500">
                      <span>{category.orders} orders</span>
                      <span>{category.products} products</span>
                    </div>
                  </div>
                ))}
              </div>
            </SMECardContent>
          </SMECard>
        </div>

        {/* Customer Insights and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Customer Insights */}
          <SMECard>
            <SMECardHeader>
              <h3 className="text-lg font-semibold font-heading">Customer Insights</h3>
            </SMECardHeader>
            <SMECardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-seftec-purple mb-1">
                    {dashboardData.customerMetrics.newCustomers}
                  </div>
                  <div className="text-sm text-sme-neutral-600">New Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-seftec-mint mb-1">
                    {dashboardData.customerMetrics.returningCustomers}
                  </div>
                  <div className="text-sm text-sme-neutral-600">Returning</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-seftec-gold mb-1">
                    {formatCurrency(dashboardData.customerMetrics.customerLifetimeValue)}
                  </div>
                  <div className="text-sm text-sme-neutral-600">Avg LTV</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sme-neutral-700 mb-1">
                    {dashboardData.customerMetrics.averageSessionDuration}m
                  </div>
                  <div className="text-sm text-sme-neutral-600">Avg Session</div>
                </div>
              </div>
            </SMECardContent>
          </SMECard>

          {/* Top Selling Products */}
          <SMECard>
            <SMECardHeader>
              <h3 className="text-lg font-semibold font-heading">Top Selling Products</h3>
            </SMECardHeader>
            <SMECardContent>
              <div className="space-y-4">
                {dashboardData.topSellingProducts.map((product, index) => (
                  <div key={product.productId} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-seftec-purple to-seftec-mint rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sme-neutral-900 truncate">{product.productName}</p>
                      <div className="flex items-center space-x-2 text-sm text-sme-neutral-600">
                        <span>{formatCurrency(product.revenue)} revenue</span>
                        <span>•</span>
                        <span>{product.orders} orders</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-seftec-gold fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SMECardContent>
          </SMECard>
        </div>

        {/* Traffic Sources and Geographic Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Traffic Sources */}
          <SMECard>
            <SMECardHeader>
              <h3 className="text-lg font-semibold font-heading">Traffic Sources</h3>
            </SMECardHeader>
            <SMECardContent>
              <div className="space-y-4">
                {dashboardData.trafficSources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sme-neutral-900">{source.source}</span>
                        <span className="text-sm text-sme-neutral-600">{source.visitors.toLocaleString()} visitors</span>
                      </div>
                      <Progress
                        value={(source.visitors / Math.max(...dashboardData.trafficSources.map(s => s.visitors))) * 100}
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-sme-neutral-500 mt-1">
                        <span>{formatCurrency(source.revenue)} revenue</span>
                        <span>{formatPercentage(source.conversionRate)} conversion</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SMECardContent>
          </SMECard>

          {/* Geographic Performance */}
          <SMECard>
            <SMECardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold font-heading">Geographic Performance</h3>
              <Globe className="w-5 h-5 text-seftec-purple" />
            </SMECardHeader>
            <SMECardContent>
              <div className="space-y-3">
                {dashboardData.geographicData.slice(0, 6).map((location) => (
                  <div key={`${location.region}-${location.country}`} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sme-neutral-900">{location.country}</div>
                      <div className="text-sm text-sme-neutral-600">{location.region}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-seftec-purple">{formatCurrency(location.revenue)}</div>
                      <div className="text-sm text-sme-neutral-600">{location.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </SMECardContent>
          </SMECard>
        </div>

        {/* Inventory Alerts */}
        {dashboardData.inventoryAlerts.length > 0 && (
          <SMECard className="border-l-4 border-l-yellow-400">
            <SMECardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold font-heading">Inventory Alerts</h3>
                <SMEBadge variant="warning" size="sm">
                  {dashboardData.inventoryAlerts.length} alert{dashboardData.inventoryAlerts.length !== 1 ? 's' : ''}
                </SMEBadge>
              </div>
            </SMECardHeader>
            <SMECardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardData.inventoryAlerts.slice(0, 6).map((alert) => (
                  <div
                    key={alert.productId}
                    className="p-3 border border-sme-neutral-200 rounded-lg bg-yellow-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sme-neutral-900 text-sm truncate">
                        {alert.productName}
                      </span>
                      <SMEBadge
                        variant={alert.alertType === 'out_of_stock' ? 'destructive' : 'warning'}
                        size="sm"
                      >
                        {alert.alertType.replace('_', ' ')}
                      </SMEBadge>
                    </div>
                    <div className="text-sm text-sme-neutral-600">
                      <span className="font-medium">{alert.currentStock}</span> in stock
                      {alert.daysUntilStockout && (
                        <span className="block text-red-600">
                          {alert.daysUntilStockout} days until stockout
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </SMECardContent>
          </SMECard>
        )}
      </div>
    </div>
  );
}
