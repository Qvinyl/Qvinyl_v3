import React, { useEffect, useState } from 'react';
import PlayerContainer from './MediaPlayer/PlayerContainer';
import Sidebar from './Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { getRoomDataByKey } from '../features/roomService/RoomService';
import { joinSocketRoom, leaveSocketRoom } from '../features/socketService/SyncService';
import { joinMessageRoom, leaveMessageRoom } from '../features/socketService/HermesService';
import { clearMessages } from '../store/actions/messagesActions';
import { useSelector } from 'react-redux';
import { unsubscribe } from '../features/queueService/Queuing/QueueServices';
import '../css/Sidebar.css';
import '../css/Main.css';

const Qvinyl = () => {
    const [sidebar, setSidebar] = useState(true);
    const [roomData, setRoomData] = useState({});
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.current_room_id) {
            fetchRoomData();
            joinWebsocketsRooms(user.current_room_id);
        }
    }, [user.current_room_id]);

    const handleOnClickSidebarLip = (isOpen) => {
        setSidebar(isOpen)
    }

    const fetchRoomData = async () => {
        var fetchedRoomData = await getRoomDataByKey(user.current_room_id);
        if (fetchedRoomData) {
            setRoomData(fetchedRoomData);
        }
        else {
            setRoomData({});
        }
    }

    const joinRoom = (roomkey) => {
        if (roomkey !== user.current_room_id) {
            unsubscribe();
            leaveSocketRooms();
            dispatch(clearMessages());
        }
    }

    const joinWebsocketsRooms = (roomkey) => {
        joinSocketRoom(roomkey);
        joinMessageRoom(roomkey, user.display_name);
    }

    const leaveSocketRooms = () => {
        leaveSocketRoom(user.current_room_id);
        leaveMessageRoom(user.current_room_id, user.display_name);
    }

    return (
        <div className="main"> 
            <PlayerContainer
                roomData={roomData}
                user={user}
            />
            
            <div className={sidebar ? "sidebar-wrapper" : "sidebar-wrapper-close"}>
                <div className="slide">
                    <Sidebar 
                        user={user}
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