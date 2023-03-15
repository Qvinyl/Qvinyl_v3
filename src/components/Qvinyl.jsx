import React, { useEffect, useState } from 'react';
import PlayerContainer from './MediaPlayer/PlayerContainer';
import Sidebar from './Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { getRoomDataByKey } from '../features/roomService/RoomService';
import { joinSocketRoom, } from '../features/socketService/SyncService';
import { joinMessageRoom } from '../features/socketService/HermesService';
import { clearMessages } from '../store/actions/messagesActions';

import '../css/Sidebar.css';
import '../css/Main.css';

const Qvinyl = ({user}) => {
    const [sidebar, setSidebar] = useState(true)
    const [roomData, setRoomData] = useState({})
    const [currentRoomkey, setCurrentRoomkey] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.current_room_id) {
            fetchRoomData();
            joinRoom(user.current_room_id)
        }
    }, [user.current_room_id]);

    const handleOnClickSidebarLip = (isOpen) => {
        setSidebar(isOpen)
    }

    const fetchRoomData = async () => {
        var fetchedRoomData = await getRoomDataByKey(currentRoomkey === "" ? user.current_room_id : currentRoomkey);
        setRoomData(fetchedRoomData);
    }

    const joinRoom = (roomkey) => {
        joinSocketRoom(roomkey);
        joinMessageRoom(roomkey, user.display_name);
        setCurrentRoomkey(roomkey)
        dispatch(clearMessages())
    }

    return (
        <div className="main"> 
            <PlayerContainer
                roomData={roomData}
                displayName={user.display_name}
                userId={user.user_id}
                currentRoomkey={ currentRoomkey === "" ? user.current_room_id : currentRoomkey }
            />
            
            <div className={sidebar ? "sidebar-wrapper" : "sidebar-wrapper-close"}>
                <div className="slide">
                    <Sidebar 
                        userId={user.user_id}
                        displayName={user.display_name}
                        currentRoomkey={currentRoomkey === "" ? user.current_room_id : currentRoomkey}
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