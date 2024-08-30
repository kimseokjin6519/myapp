// Home.js
import React from 'react';
import './Home.css';

const videos = [
  { id: 1, title: 'Video 1', thumbnail: 'https://via.placeholder.com/320x180' },
  { id: 2, title: 'Video 2', thumbnail: 'https://via.placeholder.com/320x180' },
  { id: 3, title: 'Video 3', thumbnail: 'https://via.placeholder.com/320x180' },
  // Add more video objects as needed
];

function Home() {
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
              <div key={video.id} className="video-card">
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
