"use client";

// components/VideoPlayer.tsx
import React, { useState, useRef } from 'react';

type VideoPlayerProps = {
    videoSource: string;
};

function VideoPlayer({ videoSource }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1.0); // Initial volume
    const [playbackRate, setPlaybackRate] = useState(1.0); // Initial playback rate

    // creating a function to toggle the video play/pause

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // handleVolumeChange function to handle the volume change

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        // setting the volume of the video element
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    // handling playback rate change
    const handlePlaybackRateChange = (newPlaybackRate: number) => {
        setPlaybackRate(newPlaybackRate);
        // 
        if (videoRef.current) {
            videoRef.current.playbackRate = newPlaybackRate;
        }
    };

    // creating a function to handle the progress bar click
    // and seek the video to the clicked time
    
    const handleProgressBarClick = (e: React.MouseEvent<HTMLProgressElement>) => {
        if (videoRef.current) {
            // store size
            const progressRect = e.currentTarget.getBoundingClientRect();
            const clickedTime =
                // 
                ((e.clientX - progressRect.left) / progressRect.width) *
                // mapping the click to the progress bar to the video duration
                videoRef.current.duration;
            videoRef.current.currentTime = clickedTime;
        }
    };

    return (
        <div>
            <video ref={videoRef} src={videoSource} controls autoPlay />
            <div>
                <button onClick={togglePlay}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                />
                <div>
                    <button onClick={() => handlePlaybackRateChange(0.5)}>0.5x</button>
                    <button onClick={() => handlePlaybackRateChange(1.0)}>1x</button>
                    <button onClick={() => handlePlaybackRateChange(1.5)}>1.5x</button>
                    <button onClick={() => handlePlaybackRateChange(2.0)}>2x</button>
                </div>
            </div>
            <progress
                // 
                onClick={handleProgressBarClick}
                value={videoRef.current ? videoRef.current.currentTime : 0}
                max={videoRef.current ? videoRef.current.duration : 1}
            />
        </div>
    );
}



export default VideoPlayer;
