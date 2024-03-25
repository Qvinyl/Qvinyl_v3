import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PlayerContainer from './MediaPlayer/PlayerContainer';
import Sidebar from './Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { getRoomDataByKey } from '../features/roomService/RoomService';
import { joinSocketRoom, leaveSocketRoom, connectSocket, syncUp } from '../features/socketService/SyncService';
import { hermes, joinMessageRoom, leaveMessageRoom, connectMessagingSocket, videoCallRoom, joinCall, leaveCall } from '../features/socketService/HermesService';
import { clearMessages } from '../store/actions/messagesActions';
import { setUserCurrentRoomkey } from '../store/actions/userActions';
import { useSelector } from 'react-redux';
import { unsubscribe } from '../features/queueService/Queuing/QueueServices';
import { socket } from '../features/socketService/SyncService';
import RefreshPageModal from './Basics/Modals/RefreshPageModal';
import VideoCall from './Sidebar/VideoCallingModule/VideoCall';
import '../css/Sidebar.css';
import '../css/Main.css';

const Qvinyl = ({peerService, roomId}) => {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(true);
    const [roomData, setRoomData] = useState({});
    const [refreshPageModalOpen, setRefreshPageModalOpen] = useState(false);
    const [activeUserList, setActiveUserList] = useState([]);
    const [usersOnCall, setUsersOnCall] = useState([]);
    const [contentPlaying, setContentPlaying] = useState(true);
    const user = useSelector((state) => state.userReducer.user);
    const loggedIn = useSelector((state) => state.userReducer.loggedIn);

    useEffect(() => {
        try {
            if (user && loggedIn) {
                fetchRoomData(roomId);
            }
        }
        catch (e) {
            console.log(e, "no current room ID");
            navigate('login');
        }
    }, [user]);

    const handleOnClickSidebarLip = (isOpen) => {
        setSidebar(isOpen)
    }

    const fetchRoomData = async (roomId) => {
        try {
            const fetchedRoomData = await getRoomDataByKey(roomId);
            if (fetchedRoomData) {
                setRoomData(fetchedRoomData);
                connectSocketRooms();
                joinWebsocketsRooms(roomId);
            }
        } catch (e) {
            console.error(e, "no current room ID");
            navigate('page-not-found');
        }
    }

    // const joinRoom = (roomkey) => {
    //     if (roomkey !== roomId) {
    //         unsubscribe();
    //         leaveSocketRooms();
    //         dispatch(clearMessages());
    //         dispatch(setUserCurrentRoomkey(roomkey));
    //     }
    // }

    const contentPlay = (status) => {
        setContentPlaying(status);
    }

    const joinWebsocketsRooms = async (roomkey) => {
        syncUp(roomkey);
        joinSocketRoom(user, roomkey);
        joinMessageRoom(user, roomkey);

        var joiningUser = {
            userId: user.user_id,
            displayName: user.display_name
        };

        joinCall(roomId, joiningUser);
        await peerService.restartMedia();
    }

    // const leaveSocketRooms = () => {
    //     leaveSocketRoom(roomId);
    //     leaveMessageRoom(roomId, user.display_name);
    // }

    const connectSocketRooms = () => {
        connectSocket();
        connectMessagingSocket();
    }

    const leaveVideoCall = async () => {
        peerService.streamManager.disconnect();
        await peerService.disconnectCalls();

        var leavingUser = {
            userId: user.user_id,
            displayName: user.display_name
        }
        leaveCall(roomId, leavingUser);
    }

    socket.on('disconnect', () => {
        setRefreshPageModalOpen(true);
    });

    const toggleCamera = () => {
        peerService.streamManager.toggleCamera();
    }

    const toggleMicrophone = () => {
        peerService.streamManager.toggleMicrophone();
    }

    hermes.off(`joinCall-${roomId}`).on(`joinCall-${roomId}`, async (data) => {
        const joiningUser = data.user;
        if (user.user_id !== joiningUser.userId) {
            setUsersOnCall(prevUsers => [...prevUsers, joiningUser]);
            const stream = await peerService.streamManager.getLocalStream();
            if (stream) {
                setTimeout(async () => {
                    await peerService.callUser(joiningUser.userId);
                }, 2000);
            }
        }
    });

    hermes.off(`leaveCall-${roomId}`).on(`leaveCall-${roomId}`, (data) => {
        setUsersOnCall(usersOnCall.filter((userOnCall) => userOnCall.userId !== data.user.userId));
    });

    hermes.off(`active-users-${roomId}`).on(`active-users-${roomId}`, async (data) => {
        setActiveUserList(data.filter((activeUser) => activeUser.userId !== user.user_id));
        for (const userdata of activeUserList) {
            await peerService.callUser(userdata.userId);
        }
    });

    return (
        <div className="main">
            {
                user &&
                <>
                    <div style={{ width: contentPlaying ? "100%" : "1px", height: contentPlaying ? "100%" : "1px", transition: "0.5s"}}>
                        <PlayerContainer
                            contentPlay={contentPlay}
                            roomId={roomId}
                            user={user}
                        />
                    </div>

                    <div style={{ width: contentPlaying ? "28%" : "100%", display: "flex", overflow: "hidden", backgroundColor: contentPlaying ? "#212121" : "transparent", transition: "0.5s" }}>
                        <VideoCall
                            contentPlaying={contentPlaying}
                            userId={user.user_id}
                            users={activeUserList}
                            leaveVideoCall={leaveVideoCall}
                            toggleCamera={toggleCamera}
                            toggleMicrophone={toggleMicrophone}
                        />
                    </div>
                </>

            }

            <div className={sidebar ? "sidebar-wrapper" : "sidebar-wrapper-close"}>

                <div className="slide">
                    <Sidebar
                        user={user}
                        isOpen={sidebar}
                        roomId={roomId}
                        // joinRoom={joinRoom}
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