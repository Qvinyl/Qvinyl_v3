import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import VideoControls from "./VideoControls";
import './VideoCall.css'

const VideoCallWindow = ({ user, userId, id, toggleCamera, toggleMicrophone, leaveVideoCall }) => {
    return (
        <>
            {id &&

                <div className="video-call-window">
                    <video className="video-window" id={id} />
                    {user?.displayName &&
                        <div className="displayName">{user?.displayName}</div>
                    }
                    <div className="video-controls">
                        {
                            id === "local-video" &&
                            <VideoControls
                                leaveVideoCall={leaveVideoCall}
                                toggleCamera={toggleCamera}
                                toggleMicrophone={toggleMicrophone}
                            />
                        }
                    </div>
                </div>
            }
        </>


    )
}

export default VideoCallWindow;