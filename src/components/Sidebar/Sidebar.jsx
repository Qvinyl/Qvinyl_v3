import React, { useEffect, useState, useCallback } from 'react';
import JukeChat from './JukeChat';
import '../../css/Sidebar.css'



const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="collaboration-container">
                <JukeChat/>
            </div>
        </div>
    )

}
export default Sidebar;