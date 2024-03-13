import { React, useRef, useEffect, useState, useMemo } from 'react';
import RoundedInputField from '../../Basics/InputField/RoundedInputField';
import FormControl from '@mui/material/FormControl';
import MessageList from './MessageList';
// import CustomTabs from '../../Basics/Tabs/CustomTabs';
import CallingRoomModal from '../../Basics/Modals/VideoCalling/CallingRoomModal';
import ReceivingCallModal from '../../Basics/Modals/VideoCalling/ReceivingCallModal';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import VideoCall from './VideoCallingModule/VideoCall';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { Button } from '@mui/material';
import { hermes, sendMessage, videoCallRoom, joinCall, getActiveUserList } from '../../../features/socketService/HermesService';
import { useDispatch } from 'react-redux';
import { hasUnreadMessages } from '../../../store/actions/messagesActions';
import { addMessage } from '../../../store/actions/messagesActions';
import '../../../css/Messaging.css';
import PeerService from '../../../features/callingService/PeerService'; // Update the path as needed


const Messaging = ({ currentRoomkey, userId, displayName }) => {
    const peerCon = useMemo(() => new PeerService(userId), [userId]); // Use useMemo to create peerCon only once
    const [message, setMessage] = useState("");
    const [videoCalling, setVideoCalling] = useState(false);
    const [callingModalOpen, setCallingModalOpen] = useState(false);
    const [receivingCallModalOpen, setReceivingCallModalOpen] = useState(false);
    const [caller, setReceiveCaller] = useState({});
    const inputReference = useRef(null);
    const [usersOnCall, setUsersOnCall] = useState([]);
    const [activeUserList, setActiveUserList] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        inputReference.current.focus();
    }, []);

    const handleCallingModalOpen = () => {
        setCallingModalOpen(true);
    };

    const handleCallingModalClose = () => {
        setCallingModalOpen(false);
    };

    const handleReceivingCallModalOpen = () => {
        setReceivingCallModalOpen(true);
    };

    const handleReceivingCallModalClose = () => {
        setReceivingCallModalOpen(false);
    };

    const handleAcceptCall = async () => {
        var acceptingCallUser = {
            userId: userId,
            displayName: displayName
        };

        // Set videoCalling to true to indicate the call is accepted
        setVideoCalling(true);

        // Join the call with the accepting user
        joinCall(currentRoomkey, acceptingCallUser);

        // Close the receiving call modal
        handleReceivingCallModalClose();
        
        await peerCon.openCamera();
        // peerCon.answerCalls();
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        if (message === "\n" || message === "") {
            return;
        }
        var sendMessageObj = {
            userId: userId,
            displayName: displayName,
            text: message
        }
        sendMessage(currentRoomkey, sendMessageObj)
        setMessage("");
    };

    const setMessageInput = (event) => {
        const newValue = event.target.value;
        setMessage(newValue);
    }

    const keyPress = (e) => {
        if (message !== "\n" || message !== "") {
            if (e.keyCode === 13) {
                e.preventDefault();
                handleSubmit(e);
            }
        }
    }

    const toggleCamera = () => {
        peerCon.streamManager.toggleCamera();
    }

    const toggleMicrophone = () => {
        peerCon.streamManager.toggleMicrophone();
    }

    const audioCall = () => {
        console.log("Audio call");
    }

    const videoCall = async () => {
        handleCallingModalOpen();
        var userCalling = {
            userId: userId,
            displayName: displayName
        }
       
       
        setVideoCalling(true);  

        await peerCon.openCamera();
        for (const user of activeUserList) {
            if (user !== userId) {
                await peerCon.callUser(user);
            }
        }

        const stream = await peerCon.streamManager.getLocalStream();
        if (stream) {
            videoCallRoom(currentRoomkey, userCalling);
        }
    }

    const endVideoCall = () => {
        // endCall();
        setVideoCalling(false);
    }

    useEffect(() => {
        hermes.off(`active-users-${currentRoomkey}`).on(`active-users-${currentRoomkey}`, (data) => {
            setActiveUserList(data);
        });
    }, [currentRoomkey]);

    // Listen for new Messages
    hermes.off(`message-${currentRoomkey}`).on(`message-${currentRoomkey}`, (data) => {
        dispatch(hasUnreadMessages(true));
        dispatch(addMessage(data));
    });


    // Listen for general calls
    hermes.off(`videoCallRoom-${currentRoomkey}`).on(`videoCallRoom-${currentRoomkey}`, (data) => {
        const { user } = data;
        setReceiveCaller(user);
        if (data.user.userId != userId) {
            handleReceivingCallModalOpen();
            setUsersOnCall(prevUsers => [...prevUsers, user]);
        }
    });

    // Listen for when a user Joins a Call
    hermes.off(`joinCall-${currentRoomkey}`).on(`joinCall-${currentRoomkey}`, (data) => {
        const { user } = data;

        // Check if the user joining the call is not the current user
        if (userId !== user.userId) {
            // Update the list of users on the call
            setUsersOnCall(prevUsers => [...prevUsers, user]);
        }
        peerCon.callUser(user.userId);
    });

    // Listen for when a user Leaves a call
    hermes.off(`leaveCall-${currentRoomkey}`).on(`leaveCall-${currentRoomkey}`, (data) => {
        console.log()
    });

    // Listen for when a user declines a call
    hermes.off(`declineCall-${currentRoomkey}`).on(`declineCall-${currentRoomkey}`, (data) => {
        console.log()
    });

    // Listen for when a user cancels a call
    hermes.off(`cancelCall-${currentRoomkey}`).on(`cancelCall-${currentRoomkey}`, (data) => {
        console.log()
    });

    return (
        <div className="content-container messaging">
            {
                !videoCalling &&

                <div className="call-options">
                    <CallIcon className='call-icon' onClick={() => audioCall()} />
                    <VideocamIcon className='call-icon' onClick={() => videoCall()} />
                </div>
            }
            {
                videoCalling &&
                <div style={{ color: "white", position: "relative", width: "100%" }}>
                    <Button style={{ cursor: "pointer" }} onClick={() => endVideoCall()}> End Call &nbsp; <CallEndIcon className="end-call" /></Button>
                </div>
            }
            <div className={videoCalling ? "video-call-container" : "video-call-container closed"}>
                {
                    videoCalling &&
                    <VideoCall 
                        userId={userId} 
                        users={usersOnCall} 
                        toggleCamera={toggleCamera}
                        toggleMicrophone={toggleMicrophone}    
                    />
                }
            </div>

            <div className={`content-container ${videoCalling ? "messaging-container-shrunk" : "messaging-container"}`} >
                {/* <MessageList userId={userId} /> */}
                <div className="input-field send">
                    <FormControl onSubmit={handleSubmit}>
                        <RoundedInputField
                            value={message}
                            onKeyDown={keyPress}
                            onChange={setMessageInput}
                            type="text"
                            inputRef={inputReference}
                            label="Send a message..." multiline maxRows={4} />
                    </FormControl>
                </div>
            </div>

            <ReceivingCallModal
                caller={caller.displayName}
                receivingCallModalOpen={receivingCallModalOpen}
                handleAcceptCall={handleAcceptCall}
                handleReceivingCallModalClose={handleReceivingCallModalClose}
            />

            <CallingRoomModal
                callingModalOpen={callingModalOpen}
                handleCallingModalClose={handleCallingModalClose}
            />
        </div>
    )
}

export default Messaging;