import React, { useState } from 'react';
import { Button, Box, Typography, LinearProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setUploadProgress(0);
      const progressCallback = (progress) => {
        setUploadProgress(progress);
      };

      await onUpload(file, progressCallback);
      setSuccess('File uploaded successfully!');
      setFile(null);
      setUploadProgress(0);
    } catch (err) {
      setError(err.message || 'Failed to upload file');
      setUploadProgress(0);
    }
  };

  return (
    <Box sx={{ p: 3, border: '1px dashed #ccc', borderRadius: 2 }}>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" gutterBottom>
          Upload an LLD
        </Typography>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Select File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {file && (
          <Typography variant="body1">
            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </Typography>
        )}
      </Box>
      {file && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{ mt: 2 }}
        >
          Upload
        </Button>
      )}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Uploading: {uploadProgress}%
          </Typography>
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {success}
        </Alert>
      )}
    </Box>
  );
};

export default FileUpload;