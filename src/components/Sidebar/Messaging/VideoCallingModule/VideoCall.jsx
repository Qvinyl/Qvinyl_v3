import React, { useEffect } from "react";
import { Table, TableBody, TableRow, TableCell, Button } from "@mui/material";
import VideoCallWindow from "./VideoCallWindow";
import './VideoCall.css';

const VideoCall = ({ userId, users, toggleCamera, toggleMicrophone }) => {
    useEffect(() => {

    }, [users]);
    
    return (
        <div className="video-call-container">
            {
                users.map((user, index) =>
                    <VideoCallWindow
                        key={user?.userId}
                        user={user}
                        userId={userId}
                        id={user?.userId}
                    />
                )
            }

            <div className="local-feed">
                <VideoCallWindow
                    userId={userId}
                    id={"local-video"}
                    toggleCamera={toggleCamera}
                    toggleMicrophone={toggleMicrophone}
                />
            </div>
        </div>
    )
}

export default VideoCall;