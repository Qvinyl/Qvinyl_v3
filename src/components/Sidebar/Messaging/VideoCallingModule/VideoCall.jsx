import React, { useEffect } from "react";
import { Table, TableBody, TableRow, TableCell, Button} from "@mui/material";
import VideoCallWindow from "./VideoCallWindow";
import './VideoCall.css';

const VideoCall = ({userId, users, toggleCamera, toggleMicrophone}) => {
    useEffect(()=> {

    }, [users])
    return (
        <Table className="video-call-container">
            <TableBody>
                <VideoCallWindow 
                    userId={userId} 
                    id={"local-video"} 
                    toggleCamera={toggleCamera}
                    toggleMicrophone={toggleMicrophone} 
                />
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
            </TableBody>               
        </Table>    
    )
}

export default VideoCall;