import React from 'react';
import './VideoPlayer.css'; // Import the CSS file

function VideoPlayer() {
  return (
    <div className="video-container">
      <iframe
        title="YouTube Video"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ" /* Example YouTube video URL */
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="youtube-iframe"
      />
    </div>
  );
}

export default VideoPlayer;
