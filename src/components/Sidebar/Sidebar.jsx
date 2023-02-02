import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ChatIcon from '@mui/icons-material/Chat';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import WeekendIcon from '@mui/icons-material/Weekend';
import NotificationsIcon from '@mui/icons-material/Notifications';

import '../../css/Sidebar.css'


const Sidebar = () => {
    const [tab, setTab] = useState(0)

    const chooseTabs = (index) => {
        setTab(index)
    }

    return (
        <div className="sidebar">
            <ButtonGroup className="button-group" variant="contained" aria-label="outlined primary button group">
                <Button className={tab === 0 ? "active-tab" : "tab"} onClick={() => chooseTabs(0)}><ChatIcon/></Button>
                <Button className={tab === 1 ? "active-tab" : "tab"} onClick={() => chooseTabs(1)}><QueueMusicIcon/></Button>
                <Button className={tab === 2 ? "active-tab" : "tab"} onClick={() => chooseTabs(2)}><WeekendIcon/></Button>
                <Button className={tab === 3 ? "active-tab" : "tab"} onClick={() => chooseTabs(3)}><NotificationsIcon/></Button>
            </ButtonGroup>
        </div>
    )
}

export default Sidebar