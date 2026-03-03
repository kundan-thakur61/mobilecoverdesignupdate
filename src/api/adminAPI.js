import axiosClient from './axiosClient';

const adminAPI = {
  getDashboardOverview: () => axiosClient.get('/admin/overview'),

  getThemes: (params) => axiosClient.get('/admin/themes', { params }),

  getThemeCategories: () => axiosClient.get('/admin/themes/categories'),

  createThemeCategory: (payload) => axiosClient.post('/admin/themes/categories', payload),

  updateThemeCategory: (id, payload) => axiosClient.put(`/admin/themes/categories/${id}`, payload),

  deleteThemeCategory: (id) => axiosClient.delete(`/admin/themes/categories/${id}`),

  createTheme: (payload) => axiosClient.post('/admin/themes', payload),

  updateTheme: (id, payload) => axiosClient.put(`/admin/themes/${id}`, payload),

  deleteTheme: (id) => axiosClient.delete(`/admin/themes/${id}`),

  activateTheme: (id) => axiosClient.put(`/admin/themes/${id}/activate`),

  // Coupons
  getCoupons: () => axiosClient.get('/admin/coupons'),
  createCoupon: (data) => axiosClient.post('/admin/coupons', data),
  updateCoupon: (id, data) => axiosClient.put(`/admin/coupons/${id}`, data),
  deleteCoupon: (id) => axiosClient.delete(`/admin/coupons/${id}`),

  // Analytics
  getRevenueAnalytics: (params) => axiosClient.get('/admin/analytics/revenue', { params }),
  getProductAnalytics: (params) => axiosClient.get('/admin/analytics/products', { params }),
  getCustomerAnalytics: (params) => axiosClient.get('/admin/analytics/customers', { params }),

  // Newsletter
  getSubscribers: (params) => axiosClient.get('/admin/newsletter', { params }),

  // Contacts
  getContacts: (params) => axiosClient.get('/admin/contacts', { params }),
  updateContactStatus: (id, data) => axiosClient.put(`/admin/contacts/${id}`, data),
};

export default adminAPI;

