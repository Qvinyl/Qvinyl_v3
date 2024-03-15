import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import PlayerContainer from './MediaPlayer/PlayerContainer';
import Sidebar from './Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { getRoomDataByKey } from '../features/roomService/RoomService';
import { joinSocketRoom, leaveSocketRoom, connectSocket, syncUp } from '../features/socketService/SyncService';
import PeerService from '../features/callingService/PeerService';
import { hermes, joinMessageRoom, leaveMessageRoom, connectMessagingSocket, videoCallRoom, joinCall, leaveCall } from '../features/socketService/HermesService';
import { clearMessages } from '../store/actions/messagesActions';
import { setUserCurrentRoomkey } from '../store/actions/userActions';
import { useSelector } from 'react-redux';
import { unsubscribe } from '../features/queueService/Queuing/QueueServices';
import { socket } from '../features/socketService/SyncService';
import RefreshPageModal from './Basics/Modals/RefreshPageModal';
import VideoCall from './Sidebar/Messaging/VideoCallingModule/VideoCall';
import { Button } from '@mui/material';
import CallEndIcon from '@mui/icons-material/CallEnd';
import '../css/Sidebar.css';
import '../css/Main.css';

const Qvinyl = ({ }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(true);
    const [roomData, setRoomData] = useState({});
    const [refreshPageModalOpen, setRefreshPageModalOpen] = useState(false);
    const [roomId, setRoomId] = useState();
    const [activeUserList, setActiveUserList] = useState([]);
    const [usersOnCall, setUsersOnCall] = useState([]);
    const user = useSelector((state) => state.userReducer.user);
    const loggedIn = useSelector((state) => state.userReducer.loggedIn);
    const peerCon = useMemo(() => new PeerService(user.user_id), [user?.user_id]);

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            if (user && loggedIn) {
                fetchRoomData(location.state.roomId);
                setRoomId(location.state.roomId)
                connectSocketRooms();
                setTimeout(() => {
                    joinWebsocketsRooms(user, location.state.roomId);
                }, 1500);
            }
        }
        catch (e) {
            console.log(e, "no current room ID");
            navigate('/login');
        }
    }, [user]);

    const handleOnClickSidebarLip = (isOpen) => {
        setSidebar(isOpen)
    }

    const fetchRoomData = async (roomId) => {
        try {
            var fetchedRoomData = await getRoomDataByKey(roomId);
            if (fetchedRoomData) {
                setRoomData(fetchedRoomData);
            }
        }
        catch (e) {
            console.log(e, "no current room ID");
            navigate('/page-not-found');
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

    const joinWebsocketsRooms = async () => {
        syncUp(roomId);
        joinSocketRoom(user, roomId);
        joinMessageRoom(user, roomId);

        var joiningUser = {
            userId: user.user_id,
            displayName: user.display_name
        };

        joinCall(roomId, joiningUser);
        await peerCon.openCamera();
    }

    const leaveSocketRooms = () => {
        leaveSocketRoom(roomId);
        leaveMessageRoom(roomId, user.display_name);
    }

    const connectSocketRooms = () => {
        connectSocket();
        connectMessagingSocket();
    }

    const leaveVideoCall = async () => {
        peerCon.streamManager.disconnect();
        await peerCon.disconnectCalls();

        var leavingUser = {
            userId: user.user_id,
            displayName: user.display_name
        }
        // console.log(leavingUser);
        leaveCall(roomId, leavingUser);
    }

    socket.on('disconnect', () => {
        setRefreshPageModalOpen(true);
    });

    const toggleCamera = () => {
        peerCon.streamManager.toggleCamera();
    }

    const toggleMicrophone = () => {
        peerCon.streamManager.toggleMicrophone();
    }

    hermes.off(`joinCall-${roomId}`).on(`joinCall-${roomId}`, async (data) => {
        const joiningUser = data.user;
        // Check if the user joining the call is not the current user
        if (user.user_id !== joiningUser.userId) {
            // Update the list of users on the call
            setUsersOnCall(prevUsers => [...prevUsers, joiningUser]);
            const stream = await peerCon.streamManager.getLocalStream();
            if (stream) {
                await peerCon.callUser(joiningUser.userId);
            }
        }
        await peerCon.answerCalls();
    });

    hermes.off(`leaveCall-${roomId}`).on(`leaveCall-${roomId}`, (data) => {
        console.log(data)
        setUsersOnCall(usersOnCall.filter((userOnCall) => userOnCall.userId !== data.user.userId));
    });

    useEffect(() => {
        hermes.off(`active-users-${roomId}`).on(`active-users-${roomId}`, (data) => {
            setActiveUserList(data);
        });
    }, [roomId]);

    return (
        <div className="main">
            {
                user &&
                // <PlayerContainer
                //     roomData={roomData}
                //     user={user}
                // />
                <div style={{ width: "100%", display: "flex", overflow: "hidden"}}>
                    <VideoCall
                        userId={user.user_id}
                        users={usersOnCall}
                        toggleCamera={toggleCamera}
                        toggleMicrophone={toggleMicrophone}
                    />
                    {/* <div style={{ color: "white", position: "relative", width: "100%" }}>
                    <Button style={{ cursor: "pointer" }} onClick={() => leaveVideoCall()}> Leave Call &nbsp; <CallEndIcon className="end-call" /></Button>
                </div> */}
                </div>

            }

            <div className={sidebar ? "sidebar-wrapper" : "sidebar-wrapper-close"}>
                
                <div className="slide">
                    <Sidebar 
                        user={user}
                        isOpen={sidebar}
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