import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ChatIcon from '@mui/icons-material/Chat';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import WeekendIcon from '@mui/icons-material/Weekend';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Messaging from './Messaging/Messaging';
import Queue from './Queue/Queue';
import Rooms from './Rooms/Rooms';
import Notifications from './Notifications/Notifications';
import '../../css/Sidebar.css'

const MESSAGING = 0;
const MUSIC_QUEUE = 1;
const VIRTUAL_ROOMS = 2;
const NOTIFICATIONS = 3;


const Sidebar = () => {
    const [tab, setTab] = useState(2)

    const chooseTabs = (index) => {
        setTab(index)
    }
    
    const getComponent = () => {
        switch(tab) {
            case MESSAGING:
                return <Messaging/>
            case MUSIC_QUEUE:
                return <Queue/>
            case VIRTUAL_ROOMS:
                return <Rooms/>
            case NOTIFICATIONS:
                return <Notifications/>
            default: 
                return <Messaging/>
        }
    }
   
    

    return (
        <div className="sidebar" id="sidebar-component">
            <ButtonGroup className="tab-group tabs" variant="contained" aria-label="outlined primary button group">
                <Button className={tab === MESSAGING ? "active-tab" : "tab"} onClick={() => chooseTabs(MESSAGING)}>
                    <ChatIcon className={tab === MESSAGING ? "active" : "inactive"}/>
                </Button>
                <Button className={tab === MUSIC_QUEUE ? "active-tab" : "tab"} onClick={() => chooseTabs(MUSIC_QUEUE)}>
                    <QueueMusicIcon className={tab === MUSIC_QUEUE ? "active" : "inactive"}/>
                </Button>
                <Button className={tab === VIRTUAL_ROOMS ? "active-tab" : "tab"} onClick={() => chooseTabs(VIRTUAL_ROOMS)}>
                    <WeekendIcon className={tab === VIRTUAL_ROOMS ? "active" : "inactive"}/>
                </Button>
                <Button className={tab === NOTIFICATIONS ? "active-tab" : "tab"} onClick={() => chooseTabs(NOTIFICATIONS)}>
                    <NotificationsIcon className={tab === NOTIFICATIONS ? "active" : "inactive"}/>
                </Button>
            </ButtonGroup>
            <div className="content">
               {getComponent()}
            </div>
        </div>
    )
}

export default Sidebar