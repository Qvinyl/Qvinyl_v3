import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@mui/material';
import VideoCallWindow from '../../Sidebar/VideoCallingModule/VideoCallWindow';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import PeerService from '../../../features/callingService/PeerService';
import Qvinyl from '../../Qvinyl';

const WaitingRoom = () => {
    const location = useLocation();
    const user = useSelector((state) => state.userReducer.user);
    const [peerService, setPeerService] = useState(new PeerService());
    const [roomId, setRoomId] = useState();
    const [joinedCall, setJoinedCall] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        turnOnCamera();
        setRoomId(location.state.roomId);
    }, []);


    const turnOnCamera = () => {
        peerService.openCamera();
    }

    const toggleCamera = () => {
        peerService.streamManager.toggleCamera();
    }

    const toggleMicrophone = () => {
        peerService.streamManager.toggleMicrophone();
    }

    const joinCall = async () => {
        peerService.connect(user.user_id);
        setTimeout(() => {
            setJoinedCall(true);
            setLoading(false);
        }, 1000);
    }

    return (
        <>
            {
                joinedCall ?
                    <Qvinyl
                        roomId={roomId}
                        peerService={peerService}
                    />
                    :
                    <div className="main">
                        <div style={{ display: "flex", flexDirection: "row", margin: "auto", width: "60%" }}>
                            {/* Local video window */}
                            <div className="local-window" style={{ flex: "1" }}>
                                <VideoCallWindow
                                    userId={user?.user_id}
                                    id={"local-video"}
                                    toggleCamera={toggleCamera}
                                    toggleMicrophone={toggleMicrophone}
                                />
                            </div>

                            {/* Join/Close buttons */}
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: "20px" }}>
                                <Button variant="contained" style={{ marginBottom: "10px" }} onClick={joinCall}>Join Call</Button>
                                <Button variant="contained" color="error">Close</Button>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default WaitingRoom;
