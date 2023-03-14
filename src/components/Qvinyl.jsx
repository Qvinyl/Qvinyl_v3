import React, { useEffect, useState } from 'react';
import PlayerContainer from './MediaPlayer/PlayerContainer';
import Sidebar from './Sidebar/Sidebar';
import { getRoomDataByKey } from '../features/roomService/RoomService';
import { joinSocketRoom } from '../features/socketService/SyncService';
import '../css/Sidebar.css';
import '../css/Main.css';

const Qvinyl = ({user}) => {
    const [sidebar, setSidebar] = useState(true)
    const [roomData, setRoomData] = useState({})
    const [currentRoomkey, setCurrentRoomkey] = useState("");

    useEffect(() => {
        if (user.current_room_id) {
            fetchRoomData();
            joinSocketRoom(currentRoomkey === "" ? user.current_room_id : currentRoomkey);
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
        joinSocketRoom(currentRoomkey === "" ? user.current_room_id : currentRoomkey);
        setCurrentRoomkey(roomkey)
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