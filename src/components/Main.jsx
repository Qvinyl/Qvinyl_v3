import React, { useState } from 'react';
import PlayerContainer from './MediaPlayer/PlayerContainer';
import Sidebar from './Sidebar/Sidebar';
import '../css/Sidebar.css';
import '../css/Main.css';

const Main = () => {
    const [sidebar, setSidebar] = useState(true)

    const handleOnClickSidebarLip = (isOpen) => {
        setSidebar(isOpen)
    }

    return (
        <div className="main"> 
            <PlayerContainer/>
            
            <div className={sidebar ? "sidebar-wrapper" : "sidebar-wrapper-close"}>
                <div className="slide">
                    <Sidebar 
                        isOpen={sidebar}
                        handleOnClickSidebarLip={handleOnClickSidebarLip} 
                    />
                </div>
            </div>
        </div>
    )
}

export default Main;