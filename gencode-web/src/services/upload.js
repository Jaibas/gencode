import axios from 'axios';

const API_URL = 'http://localhost:8080/file/upload';

const uploadFile = async (file, token) => {
  const formData = new FormData();
  formData.append('file', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(`${API_URL}`, formData, config);
  return response.data;
};

const getUploadHistory = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}/history`, config);
  return response.data;
};

export default {
  uploadFile,
  getUploadHistory
};