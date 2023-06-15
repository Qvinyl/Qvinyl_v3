import React, { useState } from "react";
import { Button } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { cameraToggle, microphoneToggle } from "../../../../features/callingService/videoCalling";

const VideoControls = () => {
    const[toggleCamera, setCamera] = useState(true)
    const[toggleMicrophone, setMicrophone] = useState(true)
    
    const camToggle = () => {
        cameraToggle(!toggleCamera);
        setCamera(!toggleCamera)
    }

    const micToggle = () => {
        microphoneToggle(!toggleMicrophone)
        setMicrophone(!toggleMicrophone)
    }

    return (
        <div>
            <Button onClick={() => camToggle()}>
                {toggleCamera ? <VideocamIcon/> : <VideocamOffIcon/>}
            </Button>

            <Button onClick={() => micToggle()}>
                {toggleMicrophone ? <MicIcon/> : <MicOffIcon/>}
            </Button>
        </div>
     
    )
}

export default VideoControls;