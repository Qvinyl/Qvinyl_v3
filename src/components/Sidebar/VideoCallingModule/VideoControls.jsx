import React, { useState } from "react";
import { Button } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';


const VideoControls = ({toggleCamera, toggleMicrophone, leaveVideoCall}) => {
    const [camera, setCamera] = useState(true);
    const [mic, setMic] = useState(true);

    
    const toggleCam = () => {
        setCamera(!camera);
        toggleCamera();
    }

    const toggleMic = () => {
        setMic(!mic);
        toggleMicrophone();
    }

    return (
        <div>
            <Button style={{ cursor: "pointer" }} onClick={() =>  toggleCam()}>
                {camera ? <VideocamIcon/> : <VideocamOffIcon/>}
            </Button>

            <Button style={{ cursor: "pointer" }} onClick={() => toggleMic()}>
                {mic ? <MicIcon/> : <MicOffIcon/>}
            </Button>

            <Button style={{ cursor: "pointer" }} onClick={() => leaveVideoCall()}> 
                <CallEndIcon className="end-call" />
            </Button>

        </div>
     
    )
}

export default VideoControls;