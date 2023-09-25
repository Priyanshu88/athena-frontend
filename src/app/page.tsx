
// pages/index.tsx
import React from 'react';
import VideoPlayer from './components/videoplayer';

function Home() {
  return (
    <div>
      <h1>Video Player App</h1>
      <VideoPlayer videoSource="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_30mb.mp4" />
    </div>
  );
};


export default Home;
