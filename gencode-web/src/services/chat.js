import axios from 'axios';

const API_URL = 'http://localhost:8080/file/query';

const getUploadHistory = async (prompt, token) => {
  const config = {
    headers: {
      prompt: prompt,
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(`${API_URL}`, config);
  return response.data;
};



export default {
  uploadFile,
  getUploadHistory
};