// MeditationVideo.jsx
import React from "react";

function MeditationVideo() {
  return (
    <div className="ratio ratio-16x9">
      <iframe
        src="https://www.youtube-nocookie.com/embed/inpok4MKVLM?rel=0&autoplay=0"
        title="Guided Meditation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default MeditationVideo;
