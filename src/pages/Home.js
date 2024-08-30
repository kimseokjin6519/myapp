import React, { useEffect, useState } from 'react';
import './Home.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchVideos = async (searchQuery = '') => {
    try {
      const response = await fetch(`${backendUrl}/api/videos/search?keywords=${searchQuery}`);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos(searchTerm);
  };

  return (
    <div className="home">
      <header className="header">
        <div className="header__logo">YouTube</div>
        <form onSubmit={handleSearch}>
          <input 
            className="header__search" 
            type="text" 
            placeholder="" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="header__icons">
          <button>Sign In</button>
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
                  <img src={video.thumbnail} alt={video.title} />
                  <h3>{video.title}</h3>
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
