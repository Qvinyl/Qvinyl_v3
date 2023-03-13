import React from 'react';
import ReactPlayer from 'react-player';

const Player = ({playback, volume, muted, setProgressValue, playerRef, url}) => {
    const onProgress = (progress) => {
        setProgressValue((progress.played * 100));
    }

    return (
        <ReactPlayer 
            autoPlay
            volume={volume} 
            ref={playerRef}
            onProgress={onProgress}
            muted={muted}
            playing={playback}
            width="100%"
            height="100%"
            url={url}
            controls={false}
        />
    )
}

export default Player;