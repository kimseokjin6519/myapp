import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import './VideoPlayer.css'; // Import the CSS file for styling

function VideoPlayer() {
  const { videoID } = useParams(); // Extract videoID from URL

  return (
    <div className="video-container"> {/* Ensure this is the only top-level element */}
      <iframe
        title="YouTube Video"
        src={`https://www.youtube.com/embed/${videoID}?modestbranding=1?showinfo=0?rel=0`} // Embed the video using the videoID
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="youtube-iframe"
      />
    </div>
  );
}

export default VideoPlayer;
