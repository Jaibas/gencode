import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import UserProfile from './components/UserProfile';
import CommandPrompt from './components/CommandPrompt';
import './components/styles.css';

const App = () => {
  const [user] = useState({
    name: 'developer',
    email: 'developer@example.com',
    role: 'Admin',
    joinDate: 'Jan 2023',
    uploads: 42,
    usedStorage: 245,
    totalStorage: 1024
  });

  const handleUpload = (files) => {
    console.log('Files uploaded:', files);
  };

  const handleCommand = (command) => {
    console.log('Command executed:', command);
  };

  return (
    <div className="app-container">
//      <div className="sidebar">
//        <UserProfile user={user} />
//      </div>
      <div className="main-content">
        <FileUpload onUpload={handleUpload} user={user} />
        <CommandPrompt onCommand={handleCommand} user={user} />
      </div>
    </div>
  );
};

export default App;