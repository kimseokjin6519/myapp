
import React, { useEffect, useState } from 'react';
import './Profile.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profile_picture: ''
  });

  const [activeTab, setActiveTab] = useState('account');

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
    window.location.href = '/';
  };

  const handleBack = () => {
    window.location.href = '/';
};

  return (
    <div className="profile-container">
      <div className="menu">
        <button onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>
          Account Settings
        </button>
        <button onClick={() => setActiveTab('billing')} className={activeTab === 'billing' ? 'active' : ''}>
          Billing and Payment
        </button>
      </div>
      <div className="content">
        {activeTab === 'account' ? (
          <div className="account-settings">
            <h1 className="section-header">Account Settings</h1>
            <div className="profile-item">
              <label className="profile-label">Profile Picture</label>
              <div className="profile-picture-container">
                {profile.profile_picture ? (
                  <img
                    src={`data:image/jpeg;base64,${profile.profile_picture}`}
                    alt="Profile"
                  />
                ) : (
                  <div className="default-picture">No Picture</div>
                )}
              </div>
            </div>
            <form className="profile-form">
              <div className="profile-item">
                <label className="profile-label">Name</label>
                <input type="text" value={profile.name}  />
              </div>
              <div className="profile-item">
                <label className="profile-label">Email</label>
                <input type="email" value={profile.email}  />
              </div>
            </form>
            <div style = {{textAlign: 'left'}}>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
            </div>
          </div>
        ) : (
          <div className="billing">
            <h1 className="section-header">Billing and Payment</h1>
            <div className="payment-placeholder">
              {/* Placeholder for payment system */}
              <p>Payment System Placeholder</p>
              <input type="text" placeholder="Credit Card Number" />
              <input type="text" placeholder="Expiration Date" />
              <input type="text" placeholder="CVV" />
            </div>
            <div style = {{textAlign: 'right'}}>
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
