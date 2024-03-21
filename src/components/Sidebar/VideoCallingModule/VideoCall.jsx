import React, { useEffect } from "react";
import VideoCallWindow from "./VideoCallWindow";
import './VideoCall.css';

const VideoCall = ({ userId, users, toggleCamera, toggleMicrophone, leaveVideoCall, contentPlaying}) => {
    useEffect(() => {
        console.dir(users);
    }, [users]);
    
    return (
        <div className={ contentPlaying ?  "video-call-container" : "video-call-container-full"}>
        {/* <div className={"video-call-container"}> */}
            {
                users.map((user, index) =>
                    <VideoCallWindow
                        key={index}
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
                    leaveVideoCall={leaveVideoCall}
                    toggleCamera={toggleCamera}
                    toggleMicrophone={toggleMicrophone}
                />
            </div>
        </div>
    )
}

export default VideoCall;