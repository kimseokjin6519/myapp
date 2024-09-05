import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPlayer.css'; // Import your CSS file for styling

const backendUrl = process.env.REACT_APP_BACKEND_URL; // Adjust if necessary

function VideoPlayer() {
  const { videoID } = useParams(); // Extract videoID from URL
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/videoplayer?videoID=${videoID}`);
        if (response.ok) {
          const data = await response.json();
          setVideoData(data);
        } else {
          throw new Error('Video not found');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="video-container">
      {videoData ? (
        <div className="video-content">
          <h1>{videoData.title}</h1>
          <div className="video-player">
            <iframe
              title={videoData.title}
              src={`https://www.youtube.com/embed/${videoData.videoID}?modestbranding=1&showinfo=0&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="youtube-iframe"
            />
          </div>
        </div>
      ) : (
        <p>No video data available</p>
      )}
    </div>
  );
}

export default VideoPlayer;
