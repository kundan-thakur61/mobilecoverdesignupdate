import axiosClient from './axiosClient';

const couponAPI = {
  validateCoupon: (data) => axiosClient.post('/coupons/validate', data),
};

export default couponAPI;
