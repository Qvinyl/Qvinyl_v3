import React, { } from 'react';
import PlayerOverlay from './MediaPlayer/PlayerOverlay';
import Sidebar from './Sidebar/Sidebar';
import '../css/Main.css';

const Main = () => {
    return (
        <div className="main">
            <PlayerOverlay/>
            <Sidebar/>
        </div>
    )
}

export default Main;