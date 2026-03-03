import axiosClient from './axiosClient';

const newsletterAPI = {
  subscribe: (data) => axiosClient.post('/newsletter/subscribe', data),
  unsubscribe: (data) => axiosClient.post('/newsletter/unsubscribe', data),
};

export default newsletterAPI;
