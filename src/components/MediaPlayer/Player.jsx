import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';

const Player = ({handleOnReady, playback, volume, muted, setProgressValue, playerRef, url, handleOnVideoEnded, contentPlay}) => {
    useEffect(() => {
        if(url === undefined) {
            contentPlay(false);
        }
    }, [url])
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
            onEnded={handleOnVideoEnded}
            onReady={handleOnReady}
        />
    )
}

export default Player;