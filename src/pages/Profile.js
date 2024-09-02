import React, { useEffect, useState } from 'react';
import './Profile.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profile_picture: ''
  });

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to home
  };

  return (
    <div className="profile">
      <h1 className="profile-header">Account Settings</h1>
      
      <div className="profile-item">
        <label className="profile-label">Profile Picture</label>
        <div className="profile-picture-container">
          {profile.profile_picture ? (
            <img
              src={`data:image/jpeg;base64,${profile.profile_picture}`}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <div className="default-picture">No Picture</div>
          )}
        </div>
      </div>
      
      <div className="profile-item">
        <label className="profile-label">Name</label>
        <div className="profile-value">{profile.name || 'Not provided'}</div>
      </div>

      <div className="profile-item">
        <label className="profile-label">Email</label>
        <div className="profile-value">{profile.email || 'Not provided'}</div>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
