import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ChatIcon from '@mui/icons-material/Chat';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import WeekendIcon from '@mui/icons-material/Weekend';
// import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import SidebarLip from './SidebarLip';
import Messaging from './Messaging/Messaging';
import Queue from './Queue/Queue';
import Rooms from './Rooms/Rooms';
import Profile from './UserProfile/Profile';
import { notifications } from '../../features/socketService/NotificationService';
import { hasUnreadMessages } from '../../store/actions/messagesActions';
import { useDispatch, useSelector } from 'react-redux';

import '../../css/Sidebar.css'


const MESSAGING = 0;
const MUSIC_QUEUE = 1;
const VIRTUAL_ROOMS = 2;
const NOTIFICATIONS = 3;


const Sidebar = ({isOpen, handleOnClickSidebarLip, joinRoom, user}) => {
    const [tab, setTab] = useState();
    const [readNotifications, setReadNotifications] = useState()
    const newMessages = useSelector((state) => state.messagesReducer.hasUnreadNessages);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.current_room_id === "") {
            if (tab === VIRTUAL_ROOMS || tab === NOTIFICATIONS) {
                setTab(tab)
            }
        }
    }, [tab])

    const chooseTabs = (index) => {
        if (index === NOTIFICATIONS) {
            setReadNotifications(false);
        }    
        if (tab === MESSAGING) {
            dispatch(hasUnreadMessages(false));
        }     
        setTab(index);
    }
    
    const getComponent = () => {
        switch(tab) {
            case MESSAGING:
                return <Messaging currentRoomkey={user.current_room_id} userId={user.user_id} displayName={user.display_name}/>
            case MUSIC_QUEUE:
                return <Queue displayName={user.display_name} currentRoomkey={user.current_room_id}/>
            case VIRTUAL_ROOMS:
                return <Rooms displayName={user.display_name} userId={user.user_id} currentRoomkey={user.current_room_id} joinRoom={joinRoom}/>
            case NOTIFICATIONS:
                return <Profile displayName={user.display_name} userId={user.user_id} joinRoom={joinRoom}/>
            default: 
                chooseTabs(2);
        }
    }

    notifications.on(`notify-${user.user_id}`, (data) => {
        setReadNotifications(data.notification);
    });
   
    return (
        <div className="sidebar-container">
            <SidebarLip 
                isOpen={isOpen}
                handleOnClickSidebarLip={handleOnClickSidebarLip}/>
            <div className="sidebar">
                <ButtonGroup className="tab-group tabs" variant="contained" aria-label="outlined primary button group">
                    { user.current_room_id && 
                        <Button className={tab === MESSAGING ? "active-tab" : "tab"} onClick={() => chooseTabs(MESSAGING)}>
                            {
                                newMessages && tab !== MESSAGING ?
                                <Badge color="secondary" overlap="circular" variant="dot"> 
                                    <ChatIcon className="inactive"/>
                                </Badge>
                                :
                                <ChatIcon className={tab === MESSAGING ? "active" : "inactive"}/>
                            }
                        </Button>
                    } 
                    { user.current_room_id &&   
                        <Button className={tab === MUSIC_QUEUE ? "active-tab" : "tab"} onClick={() => chooseTabs(MUSIC_QUEUE)}>
                            <QueueMusicIcon className={tab === MUSIC_QUEUE ? "active" : "inactive"}/> 
                        </Button>
                    }
                    <Button className={tab === VIRTUAL_ROOMS ? "active-tab" : "tab"} onClick={() => chooseTabs(VIRTUAL_ROOMS)}>
                        <WeekendIcon className={tab === VIRTUAL_ROOMS ? "active" : "inactive"}/>
                    </Button>

                    <Button className={tab === NOTIFICATIONS ? "active-tab" : "tab"} onClick={() => chooseTabs(NOTIFICATIONS)}>
                        {
                            readNotifications ?
                            <Badge color="secondary" overlap="circular" variant="dot"> 
                                <NotificationsIcon className="inactive"/>
                            </Badge>
                            :
                            <NotificationsIcon className={tab === NOTIFICATIONS ? "active" : "inactive"}/>
                        }
                    </Button>   
                </ButtonGroup>
                <div className="content">
                    {getComponent()}
                </div>
            </div>
        </div>
    )
}

export default Sidebar