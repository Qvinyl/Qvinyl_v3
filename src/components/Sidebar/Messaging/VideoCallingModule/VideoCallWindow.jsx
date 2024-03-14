import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import VideoControls from "./VideoControls";
import './VideoCall.css'

const VideoCallWindow = ({user, userId, id, toggleCamera, toggleMicrophone}) => {
    return (
        <TableRow>
            <TableCell align="center" className="video-call-window"> 
                <video className="video-window" id={id}/>
                <div className="displayName">{user?.displayName}</div>
                <div className="video-controls">
                {
                    id === "local-video" && 
                    <div className="video-controls">
                        <VideoControls
                            toggleCamera={toggleCamera}
                            toggleMicrophone={toggleMicrophone}    
                        />
                    </div>
                }
                </div>
            </TableCell>
        </TableRow>
        
    )
}

export default VideoCallWindow;