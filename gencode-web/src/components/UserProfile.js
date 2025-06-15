import React from 'react';
import './styles.css';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2>{user.name}</h2>
        <p className="user-role">{user.role}</p>
      </div>
      
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Joined:</span>
          <span className="detail-value">{user.joinDate}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Uploads:</span>
          <span className="detail-value">{user.uploads}</span>
        </div>
      </div>
      
      <div className="storage-meter">
        <div className="meter-header">
          <span>Storage</span>
          <span>{user.usedStorage} MB of {user.totalStorage} MB used</span>
        </div>
        <div className="meter-bar">
          <div 
            className="meter-progress" 
            style={{ width: `${(user.usedStorage / user.totalStorage) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;