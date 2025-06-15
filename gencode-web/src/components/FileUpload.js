import React, { useState } from 'react';
import { FiUpload, FiFile, FiX, FiCheck } from 'react-icons/fi';
import './styles.css';

const FileUpload = ({ onUpload, user }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles) => {
    const updatedFiles = [...files, ...newFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9)
    }))];
    setFiles(updatedFiles);
  };

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const uploadFiles = async () => {
    const uploadResults = {};
    
    for (const fileObj of files) {
      const { file, id } = fileObj;
      uploadResults[id] = 'uploading';
      setUploadStatus({ ...uploadStatus, [id]: 'uploading' });
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => ({ ...prev, [id]: progress }));
      }
      
      uploadResults[id] = 'completed';
      setUploadStatus({ ...uploadStatus, [id]: 'completed' });
    }
    
    onUpload(files);
  };

  return (
    <div className="file-upload-container">
      <div 
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FiUpload className="upload-icon" />
        <p>Drag & Drop files here or</p>
        <label className="browse-button">
          Browse Files
          <input 
            type="file" 
            multiple 
            onChange={handleFileInput} 
            style={{ display: 'none' }} 
          />
        </label>
      </div>
      
      <div className="file-list">
        {files.map(({ file, id }) => (
          <div key={id} className="file-item">
            <div className="file-info">
              <FiFile className="file-icon" />
              <span className="file-name">{file.name}</span>
              <span className="file-size">({(file.size / 1024).toFixed(2)} KB)</span>
            </div>
            <div className="file-actions">
              {uploadStatus[id] === 'uploading' && (
                <progress value={uploadProgress[id] || 0} max="100" />
              )}
              {uploadStatus[id] === 'completed' ? (
                <FiCheck className="status-icon success" />
              ) : (
                <FiX className="status-icon remove" onClick={() => removeFile(id)} />
              )}
            </div>
          </div>
        ))}
      </div>
      
      {files.length > 0 && (
        <button className="upload-button" onClick={uploadFiles}>
          Upload {files.length} File{files.length !== 1 ? 's' : ''}
        </button>
      )}
    </div>
  );
};

export default FileUpload;