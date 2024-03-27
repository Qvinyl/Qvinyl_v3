import React, { useEffect, useState } from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import VideoControls from "./VideoControls";
import './VideoCall.css'

const VideoCallWindow = ({ user, id, toggleCamera, toggleMicrophone, leaveVideoCall }) => {
    return (
        <>
        {id &&
            <div className="video-call-window">
                <div className="video-window">
                    <video className="video-element" id={id} autoPlay playsInline muted={id === "local-video"} />
                    {user?.displayName && (
                        <div className="display-name">{user.displayName}</div>
                    )}
                </div>
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


// return (
//     <>
//         {id &&
//             <div className="video-call-window">
//                 <div className="video-window" >
//                     <video className="video-window" id={id}/>
//                     {user?.displayName && (
//                         <div className="displayName">
//                             {user.displayName}
//                         </div>
//                     )}
//                 </div> 
                
//                 {/* <div className="video-controls">
//                     {
//                         id === "local-video" &&
//                         <VideoControls
//                             leaveVideoCall={leaveVideoCall}
//                             toggleCamera={toggleCamera}
//                             toggleMicrophone={toggleMicrophone}
//                         />
//                     }
//                 </div>  */}
//             </div>
//         }
//     </>
// )