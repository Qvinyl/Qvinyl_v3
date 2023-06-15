import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import VideoControls from "./VideoControls";
import './VideoCall.css'

const VideoCallWindow = ({user, userId, id}) => {
    return (
        <TableRow>
            <TableCell align="center" className="video-call-window"> 
                <div className="window">
                    <video className="video-window" id={id}>
                        Local Video
                    </video>
                </div>
                <div className="video-controls">
                        <VideoControls/>
                </div>
                
                {/* {
                    user.user_id === userId && 
                    <div className="video-controls">
                        <VideoControls/>
                    </div>
                   
                } */}
            </TableCell>
        </TableRow>
        
    )
}

export default VideoCallWindow;