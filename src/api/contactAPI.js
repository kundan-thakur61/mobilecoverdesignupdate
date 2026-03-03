import axiosClient from './axiosClient';

const contactAPI = {
  submitForm: (data) => axiosClient.post('/contact', data),
};

export default contactAPI;
