import React from 'react';
import ReactPlayer from 'react-player';

const Player = () => {
    return (
        <div className="player">
            <ReactPlayer 
            width="100%"
            height="100%"
            url="https://www.youtube.com/watch?v=KSnckWDCE9I"/>
        </div>
    )
}

export default Player;