import React from 'react';
import ReactPlayer from 'react-player';

const Player = ({playback, volume, muted, setProgressValue, playerRef, url}) => {

    const setProgress = (progress) => {
        setProgressValue((progress.played * 100).toFixed(9))
    }

    return (
        <ReactPlayer 
            ref={playerRef}
            onProgress={setProgress}
            muted={muted}
            playing={playback}
            volume={volume}
            width="100%"
            height="100%"
            url={url}
        />
    )
}

export default Player;