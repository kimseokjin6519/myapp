import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  // State variables for user info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  // Fetch user info from the backend (mocked for now)
  useEffect(() => {
    // Here you would fetch the data from your backend API
    // For now, we'll just set some default values
    // Example: const response = await fetch('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } });
    // const data = await response.json();
    // setName(data.name);
    // setEmail(data.email);
    // setProfilePicture(data.profile_picture);

    // Mocked data
    setName('John Doe');
    setEmail('john.doe@example.com');
    setProfilePicture('https://via.placeholder.com/150'); // Placeholder image
  }, []);

  return (
    <div className="profile">
      <div className="profile__picture">
        <img src={profilePicture} alt="Profile" />
      </div>
      <div className="profile__info">
        <h1>{name}</h1>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Profile;
