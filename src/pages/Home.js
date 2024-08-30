// Home.js
import React, { useEffect, useState } from 'react';
import './Home.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/videos`);	
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="home">
      <header className="header">
        <div className="header__logo">YouTube</div>
        <input className="header__search" type="text" placeholder="Search" />
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
            {videos.map(video => (
              <div key={video._id} className="video-card">
                <img src={video.thumbnail} alt={video.title} />
                <h3>{video.title}</h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
