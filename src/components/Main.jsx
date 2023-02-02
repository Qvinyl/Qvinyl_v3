import React, { } from 'react';
import Player from './MediaPlayer/Player';
import Sidebar from './Sidebar/Sidebar';
import '../css/Main.css';

const Main = () => {
    return (
        <div className="main">
            <Player/>
            <Sidebar/>
        </div>
    )
}

export default Main;