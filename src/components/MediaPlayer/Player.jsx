import {useState} from 'react';
import ReactPlayer from 'react-player';

const Player = ({playback, volume, muted, setProgressValue}) => {
   
    const setProgress = (progress) => {
        setProgressValue((progress.played * 100).toFixed(9))
    }

    return (
        <ReactPlayer 
            onProgress={setProgress}
            muted={muted}
            playing={playback}
            volume={volume}
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=KSnckWDCE9I"
        />
    )
}

export default Player;