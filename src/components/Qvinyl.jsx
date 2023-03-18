import React, { useEffect, useState } from 'react';
import PlayerContainer from './MediaPlayer/PlayerContainer';
import Sidebar from './Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { getRoomDataByKey } from '../features/roomService/RoomService';
import { joinSocketRoom, leaveSocketRoom } from '../features/socketService/SyncService';
import { joinMessageRoom, leaveMessageRoom } from '../features/socketService/HermesService';
import { clearMessages } from '../store/actions/messagesActions';

import '../css/Sidebar.css';
import '../css/Main.css';

const Qvinyl = ({user}) => {
    const [sidebar, setSidebar] = useState(true);
    const [roomData, setRoomData] = useState({});
    const [currentRoomkey, setCurrentRoomkey] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.current_room_id) {
            fetchRoomData();
            joinWebsocketsRooms(user.current_room_id);
            setCurrentRoomkey(user.current_room_id);
        }
    }, [user.current_room_id]);

    const handleOnClickSidebarLip = (isOpen) => {
        setSidebar(isOpen)
    }

    const fetchRoomData = async () => {
        var fetchedRoomData = await getRoomDataByKey(currentRoomkey === "" ? user.current_room_id : currentRoomkey);
        if (fetchedRoomData) {
            setRoomData(fetchedRoomData);
        }
        else {
            setRoomData({});
        }
    }

    const joinRoom = (roomkey) => {
        if (roomkey !== currentRoomkey) {
            leaveSocketRooms();
            setCurrentRoomkey(roomkey);
            dispatch(clearMessages());
        }
    }

    const joinWebsocketsRooms = (roomkey) => {
        joinSocketRoom(roomkey);
        joinMessageRoom(roomkey, user.display_name);
    }

    const leaveSocketRooms = () => {
        leaveSocketRoom(currentRoomkey);
        leaveMessageRoom(currentRoomkey, user.display_name);
    }

    return (
        <div className="main"> 
            <PlayerContainer
                roomData={roomData}
                displayName={user.display_name}
                userId={user.user_id}
                currentRoomkey={ currentRoomkey }
            />
            
            <div className={sidebar ? "sidebar-wrapper" : "sidebar-wrapper-close"}>
                <div className="slide">
                    <Sidebar 
                        userId={user.user_id}
                        displayName={user.display_name}
                        currentRoomkey={currentRoomkey}
                        isOpen={sidebar}
                        joinRoom={joinRoom}
                        handleOnClickSidebarLip={handleOnClickSidebarLip} 
                    />
                </div>
            </div>
        </div>
    )
}

export default Qvinyl;