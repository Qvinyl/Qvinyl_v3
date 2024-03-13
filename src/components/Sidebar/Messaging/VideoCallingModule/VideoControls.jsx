import React, { useState } from "react";
import { Button } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const VideoControls = ({toggleCamera, toggleMicrophone}) => {
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
            <Button onClick={() =>  toggleCam()}>
                {camera ? <VideocamIcon/> : <VideocamOffIcon/>}
            </Button>

            <Button onClick={() => toggleMic()}>
                {mic ? <MicIcon/> : <MicOffIcon/>}
            </Button>
        </div>
     
    )
}

export default VideoControls;