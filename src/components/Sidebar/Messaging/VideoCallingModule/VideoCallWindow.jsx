import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import VideoControls from "./VideoControls";
import './VideoCall.css'

const VideoCallWindow = ({user, userId, id}) => {
    return (
        <TableRow>
            <TableCell align="center" className="video-call-window"> 
                <div style={{color: "white"}}>{user?.displayName}</div>
                <div className="window">
                    <video className="video-window" id={id}/>
                </div>
                <div className="video-controls">
                {
                    id === "local-video" && 
                    <div className="video-controls">
                        <VideoControls/>
                    </div>
                }
                </div>
            </TableCell>
        </TableRow>
        
    )
}

export default VideoCallWindow;