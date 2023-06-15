import React, { useEffect, useState } from 'react';
import PlayerContainer from './MediaPlayer/PlayerContainer';
import Sidebar from './Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { getRoomDataByKey } from '../features/roomService/RoomService';
import { joinSocketRoom, leaveSocketRoom, connectSocket, syncUp } from '../features/socketService/SyncService';
import { joinMessageRoom, leaveMessageRoom, connectMessagingSocket } from '../features/socketService/HermesService';
import { clearMessages } from '../store/actions/messagesActions';
import { setUserCurrentRoomkey } from '../store/actions/userActions';
import { useSelector } from 'react-redux';
import { unsubscribe } from '../features/queueService/Queuing/QueueServices';
import { socket } from '../features/socketService/SyncService';
import RefreshPageModal from './Basics/Modals/RefreshPageModal';
import '../css/Sidebar.css';
import '../css/Main.css';

const Qvinyl = () => {
    const [sidebar, setSidebar] = useState(true);
    const [roomData, setRoomData] = useState({});
    const [refreshPageModalOpen, setRefreshPageModalOpen] = useState(false);
    const user = useSelector((state) => state.userReducer.user);
    const loggedIn = useSelector((state) => state.userReducer.loggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            if (user.current_room_id && loggedIn) {
                fetchRoomData();
                connectSocketRooms();
                joinWebsocketsRooms(user, user.current_room_id);
            }
        }
        catch (e) {
            console.log(e, "no current room ID");
        }
      
    }, [user]);

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
            dispatch(setUserCurrentRoomkey(roomkey));
        }
    }

    const joinWebsocketsRooms = (user, roomkey) => {
        syncUp(roomkey);
        joinSocketRoom(user, roomkey);
        joinMessageRoom(roomkey, user);
    }

    const leaveSocketRooms = () => {
        leaveSocketRoom(user.current_room_id);
        leaveMessageRoom(user.current_room_id, user.display_name);
    }

    const connectSocketRooms = () => {
        connectSocket();
        connectMessagingSocket();
    }

    socket.on('disconnect', () => {
        setRefreshPageModalOpen(true);
    })

    return (
        <div className="main"> 
            {user && 
             <PlayerContainer
                roomData={roomData}
                user={user}
            />
            }
            
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

            <RefreshPageModal 
                refreshPageModalOpen={refreshPageModalOpen}
            />
        </div>
    )
}

export default Qvinyl;