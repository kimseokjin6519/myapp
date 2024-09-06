import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import defaultProfilePic from '../assets/images/default_profile.jpg';
import youtubeLogo from '../assets/images/youtube-logo.png';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(defaultProfilePic);

  const fetchVideos = async (searchQuery = '') => {
    try {
      const response = await fetch(`${backendUrl}/api/videos/search?keywords=${searchQuery}`);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/auth-status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.authenticated);

        if (data.authenticated && data.profile_picture) {
          setProfilePicture(data.profile_picture);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    fetchVideos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchTerm);
  };

  return (
    <div className="home">
      <header className="header">
        <img src={youtubeLogo} />
        <form onSubmit={handleSearch}>
          <input
            className="header__search"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="header__icons">
          {isLoggedIn ? (
            <Link to="/profile">
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-pic"
              />
            </Link>
          ) : (
            <Link to="/signin">
              <button>Sign In</button>
            </Link>
          )}
        </div>
      </header>

      <div className="home__content">
        <aside className="sidebar">
          <ul>
            <li>Home</li>
            <li>Trending</li>
            <li>Subscriptions</li>
            <li>Library</li>
          </ul>
        </aside>

        <main className="main">
          <div className="video-grid">
            {videos.length > 0 ? (
              videos.map(video => (
                <div key={video._id} className="video-card">
                  <Link to={`/video/${video.videoID}`}>
                    <img src={video.thumbnail} alt={video.title} />
                    <h3>{video.title}</h3>
                  </Link>
                </div>
              ))
            ) : (
              <p>No videos found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
