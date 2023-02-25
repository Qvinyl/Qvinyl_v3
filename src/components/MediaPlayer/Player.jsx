import React from 'react';
import ReactPlayer from 'react-player';

const Player = ({playback, volume}) => {
    return (
        <ReactPlayer 
            playing={playback}
            volume={volume}
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=KSnckWDCE9I"
            />
    )
}

export default Player;