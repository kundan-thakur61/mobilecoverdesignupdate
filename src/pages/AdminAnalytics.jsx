import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp, FiBarChart2, FiPieChart, FiAlertTriangle } from 'react-icons/fi';
import axiosClient from '../api/axiosClient';

const PERIODS = [
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '1y', label: 'Last Year' },
];

const formatCurrency = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const AdminAnalytics = () => {
  const [period, setPeriod] = useState('30d');
  const [revenue, setRevenue] = useState(null);
  const [products, setProducts] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [revRes, prodRes, custRes] = await Promise.all([
          axiosClient.get('/admin/analytics/revenue', { params: { period } }),
          axiosClient.get('/admin/analytics/products', { params: { period } }),
          axiosClient.get('/admin/analytics/customers', { params: { period } }),
        ]);
        setRevenue(revRes.data?.data);
        setProducts(prodRes.data?.data);
        setCustomers(custRes.data?.data);
      } catch (err) {
        toast.error('Failed to load analytics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [period]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Analytics & Reports</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <div className="flex gap-2">
            {PERIODS.map(p => (
              <button
                key={p.value}
                onClick={() => setPeriod(p.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  period === p.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 border hover:bg-gray-50'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg"><FiDollarSign className="w-5 h-5 text-green-600" /></div>
              <span className="text-sm text-gray-500">Total Revenue</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenue?.summary?.totalRevenue)}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg"><FiShoppingBag className="w-5 h-5 text-blue-600" /></div>
              <span className="text-sm text-gray-500">Total Orders</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{revenue?.summary?.totalOrders || 0}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg"><FiTrendingUp className="w-5 h-5 text-purple-600" /></div>
              <span className="text-sm text-gray-500">Avg Order Value</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(revenue?.summary?.avgOrderValue)}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg"><FiUsers className="w-5 h-5 text-orange-600" /></div>
              <span className="text-sm text-gray-500">New Customers</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{customers?.summary?.newUsers || 0}</p>
          </div>
        </div>

        {/* Revenue Trend */}
        {revenue?.dailyRevenue?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiBarChart2 className="w-5 h-5 text-primary-600" /> Revenue Trend
            </h2>
            <div className="overflow-x-auto">
              <div className="flex items-end gap-1 min-w-[600px] h-48">
                {revenue.dailyRevenue.map((day) => {
                  const maxRevenue = Math.max(...revenue.dailyRevenue.map(d => d.revenue));
                  const height = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
                  return (
                    <div key={day._id} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-gray-500">{formatCurrency(day.revenue)}</span>
                      <div
                        className="w-full bg-primary-500 rounded-t-sm min-h-[2px] transition-all"
                        style={{ height: `${Math.max(height, 2)}%` }}
                        title={`${day._id}: ${formatCurrency(day.revenue)} (${day.orders} orders)`}
                      />
                      <span className="text-[9px] text-gray-400 rotate-[-45deg] origin-top-left whitespace-nowrap">
                        {day._id.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Payment Method Breakdown */}
          {revenue?.paymentMethodBreakdown?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FiPieChart className="w-5 h-5 text-primary-600" /> Payment Methods
              </h2>
              <div className="space-y-3">
                {revenue.paymentMethodBreakdown.map((pm) => (
                  <div key={pm._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        pm._id === 'razorpay' ? 'bg-blue-500' : pm._id === 'upi' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <span className="text-sm font-medium capitalize">{pm._id || 'Unknown'}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold">{formatCurrency(pm.revenue)}</span>
                      <span className="text-xs text-gray-500 ml-2">({pm.count} orders)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Order Status Breakdown */}
          {revenue?.statusBreakdown?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Status Distribution</h2>
              <div className="space-y-3">
                {revenue.statusBreakdown.map((s) => {
                  const colors = {
                    pending: 'bg-yellow-100 text-yellow-800',
                    confirmed: 'bg-blue-100 text-blue-800',
                    processing: 'bg-indigo-100 text-indigo-800',
                    shipped: 'bg-purple-100 text-purple-800',
                    delivered: 'bg-green-100 text-green-800',
                    cancelled: 'bg-red-100 text-red-800',
                  };
                  return (
                    <div key={s._id} className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colors[s._id] || 'bg-gray-100 text-gray-800'}`}>
                        {s._id}
                      </span>
                      <span className="text-sm font-medium">{s.count} orders</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Products */}
          {products?.topProducts?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
              <div className="space-y-3">
                {products.topProducts.map((p, i) => (
                  <div key={p._id || i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{p.title || 'Product'}</p>
                        <p className="text-xs text-gray-500">{[p.brand, p.model].filter(Boolean).join(' • ')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{p.totalQuantity} sold</p>
                      <p className="text-xs text-gray-500">{formatCurrency(p.totalRevenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Customers */}
          {customers?.topCustomers?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Top Customers</h2>
              <div className="space-y-3">
                {customers.topCustomers.map((c, i) => (
                  <div key={c._id || i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{c.name || 'Customer'}</p>
                        <p className="text-xs text-gray-500">{c.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{formatCurrency(c.totalSpent)}</p>
                      <p className="text-xs text-gray-500">{c.orderCount} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Low Stock Alert */}
        {products?.lowStockProducts?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiAlertTriangle className="w-5 h-5 text-yellow-500" /> Low Stock Alert
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {products.lowStockProducts.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-gray-500">{p.variantColor} • {p.sku || 'No SKU'}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    p.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {p.stock} left
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Brand Performance */}
        {products?.brandPerformance?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Brand Performance</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-medium text-gray-500">Brand</th>
                    <th className="text-right py-2 font-medium text-gray-500">Orders</th>
                    <th className="text-right py-2 font-medium text-gray-500">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {products.brandPerformance.map((b) => (
                    <tr key={b._id} className="border-b last:border-0">
                      <td className="py-2 font-medium">{b._id || 'Unknown'}</td>
                      <td className="py-2 text-right">{b.orders}</td>
                      <td className="py-2 text-right font-bold">{formatCurrency(b.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAnalytics;
