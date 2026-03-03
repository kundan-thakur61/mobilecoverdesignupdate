import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiTag, FiX, FiCheck, FiPercent } from 'react-icons/fi';
import axiosClient from '../api/axiosClient';

const emptyForm = {
  code: '',
  description: '',
  discountType: 'percentage',
  discountValue: '',
  minOrderAmount: '',
  maxDiscountAmount: '',
  usageLimit: '',
  perUserLimit: '1',
  validFrom: '',
  validUntil: '',
  isActive: true,
};

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchCoupons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/admin/coupons');
      setCoupons(res.data?.data || res.data?.coupons || []);
    } catch (err) {
      toast.error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCoupons(); }, [fetchCoupons]);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (coupon) => {
    setEditingId(coupon._id);
    setForm({
      code: coupon.code || '',
      description: coupon.description || '',
      discountType: coupon.discountType || 'percentage',
      discountValue: coupon.discountValue?.toString() || '',
      minOrderAmount: coupon.minOrderAmount?.toString() || '',
      maxDiscountAmount: coupon.maxDiscountAmount?.toString() || '',
      usageLimit: coupon.usageLimit?.toString() || '',
      perUserLimit: coupon.perUserLimit?.toString() || '1',
      validFrom: coupon.validFrom ? new Date(coupon.validFrom).toISOString().slice(0, 16) : '',
      validUntil: coupon.validUntil ? new Date(coupon.validUntil).toISOString().slice(0, 16) : '',
      isActive: coupon.isActive !== false,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.code || !form.discountValue) {
      toast.error('Code and discount value are required');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        discountValue: Number(form.discountValue),
        minOrderAmount: form.minOrderAmount ? Number(form.minOrderAmount) : 0,
        maxDiscountAmount: form.maxDiscountAmount ? Number(form.maxDiscountAmount) : undefined,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
        perUserLimit: form.perUserLimit ? Number(form.perUserLimit) : 1,
        validFrom: form.validFrom ? new Date(form.validFrom) : undefined,
        validUntil: form.validUntil ? new Date(form.validUntil) : undefined,
      };

      if (editingId) {
        await axiosClient.put(`/admin/coupons/${editingId}`, payload);
        toast.success('Coupon updated');
      } else {
        await axiosClient.post('/admin/coupons', payload);
        toast.success('Coupon created');
      }
      setShowForm(false);
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save coupon');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this coupon?')) return;
    try {
      await axiosClient.delete(`/admin/coupons/${id}`);
      toast.success('Coupon deleted');
      fetchCoupons();
    } catch (err) {
      toast.error('Failed to delete coupon');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Coupon Management</h1>
          <button
            onClick={openCreateForm}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            <FiPlus className="w-4 h-4" /> New Coupon
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-5 border-b">
                <h2 className="text-lg font-semibold">{editingId ? 'Edit Coupon' : 'Create Coupon'}</h2>
                <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                    <input
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      placeholder="SAVE20"
                      className="w-full border rounded-lg px-3 py-2 uppercase"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="20% off on all orders"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                    <select name="discountType" value={form.discountType} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed (₹)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value *</label>
                    <input
                      name="discountValue"
                      type="number"
                      min="0"
                      value={form.discountValue}
                      onChange={handleChange}
                      placeholder={form.discountType === 'percentage' ? '20' : '100'}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Amount</label>
                    <input
                      name="minOrderAmount"
                      type="number"
                      min="0"
                      value={form.minOrderAmount}
                      onChange={handleChange}
                      placeholder="₹0"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount (₹)</label>
                    <input
                      name="maxDiscountAmount"
                      type="number"
                      min="0"
                      value={form.maxDiscountAmount}
                      onChange={handleChange}
                      placeholder="No limit"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                    <input
                      name="usageLimit"
                      type="number"
                      min="0"
                      value={form.usageLimit}
                      onChange={handleChange}
                      placeholder="Unlimited"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Per User Limit</label>
                    <input
                      name="perUserLimit"
                      type="number"
                      min="1"
                      value={form.perUserLimit}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
                    <input
                      name="validFrom"
                      type="datetime-local"
                      value={form.validFrom}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
                    <input
                      name="validUntil"
                      type="datetime-local"
                      value={form.validUntil}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-2">
                    <input
                      name="isActive"
                      type="checkbox"
                      checked={form.isActive}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-gray-300 text-primary-600"
                    />
                    <label className="text-sm font-medium text-gray-700">Active</label>
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Coupons Table */}
        {loading ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full mx-auto" />
            <p className="mt-3 text-gray-500">Loading coupons...</p>
          </div>
        ) : coupons.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">
            <FiTag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Coupons Yet</h3>
            <p className="text-gray-500 mb-4">Create your first coupon to offer discounts.</p>
            <button
              onClick={openCreateForm}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
            >
              Create Coupon
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Code</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500">Discount</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden sm:table-cell">Min Order</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Usage</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Valid Until</th>
                    <th className="text-center px-4 py-3 font-medium text-gray-500">Status</th>
                    <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {coupons.map((c) => {
                    const isExpired = c.validUntil && new Date(c.validUntil) < new Date();
                    return (
                      <tr key={c._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <FiTag className="w-4 h-4 text-primary-500" />
                            <span className="font-mono font-bold text-gray-900">{c.code}</span>
                          </div>
                          {c.description && <p className="text-xs text-gray-500 mt-0.5">{c.description}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                            {c.discountType === 'percentage' ? <FiPercent className="w-3 h-3" /> : '₹'}
                            {c.discountValue}{c.discountType === 'percentage' ? '%' : ''}
                          </span>
                          {c.maxDiscountAmount && (
                            <span className="text-xs text-gray-400 ml-1">max ₹{c.maxDiscountAmount}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden sm:table-cell text-gray-600">
                          {c.minOrderAmount ? `₹${c.minOrderAmount}` : '—'}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell text-gray-600">
                          {c.usedCount || 0}{c.usageLimit ? `/${c.usageLimit}` : ''}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell text-gray-600">
                          {c.validUntil ? new Date(c.validUntil).toLocaleDateString() : 'No expiry'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isExpired ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Expired</span>
                          ) : c.isActive ? (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">Inactive</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditForm(c)}
                              className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                              title="Edit"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(c._id)}
                              className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCoupons;
