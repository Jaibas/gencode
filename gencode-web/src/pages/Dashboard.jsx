import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import FileUpload from '../components/FileUpload';
import UploadHistory from '../components/UploadHistory';
import uploadService from '../services/upload';
import authService from '../services/auth';
import ChatInterface from './ChatInterface';

const Dashboard = () => {
  const [uploads, setUploads] = useState([]);
  const user = authService.getCurrentUser();

  useEffect(() => {
    if (user) {
      fetchUploadHistory();
    }
  }, [user]);

  const fetchUploadHistory = async () => {
    try {
      const history = await uploadService.getUploadHistory(user.token);
      setUploads(history);
    } catch (err) {
      console.error('Failed to fetch upload history:', err);
    }
  };

  const handleUpload = async (file, progressCallback) => {
    try {
      const response = await uploadService.uploadFile(file, user.token);
      setUploads([response, ...uploads]);
      return response;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <h1>LLD to pseudo code generator</h1>
        <FileUpload onUpload={handleUpload} />
        <ChatInterface />

        <UploadHistory uploads={uploads} />
      </Box>
    </Container>
  );
};

export default Dashboard;