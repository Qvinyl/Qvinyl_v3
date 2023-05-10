import {React, useRef, useEffect, useState} from 'react';
import RoundedInputField from '../../Basics/InputField/RoundedInputField';
import FormControl from '@mui/material/FormControl';
import MessageList from './MessageList';
// import CustomTabs from '../../Basics/Tabs/CustomTabs';
// import CallingRoomModal from '../../Basics/Modals/VideoCalling/CallingRoomModal';
// import ReceivingCallModal from '../../Basics/Modals/VideoCalling/ReceivingCallModal';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
// import VideoCall from './VideoCallingModule/VideoCall';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { Button } from '@mui/material';
import { hermes, sendMessage} from '../../../features/socketService/HermesService';
import { useDispatch } from 'react-redux';
import { hasUnreadMessages } from '../../../store/actions/messagesActions';
import { addMessage } from '../../../store/actions/messagesActions';
// import { openConnection, turnOffVideo, turnOffMicrophone, endCall } from '../../../features/callingService/videoCalling';
import '../../../css/Messaging.css';

const Messages = ({currentRoomkey, userId, displayName}) => {
    const [message, setMessage] = useState("");
    const [videoCalling, setVideoCalling] = useState(false);
    const [callingModalOpen, setCallingModalOpen] = useState(false);
    const [receivingCallModalOpen, setReceivingCallModalOpen] = useState(false);
    const [caller, setReceiveCaller] = useState({});
    const inputReference = useRef(null);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if ( message === "\n" || message === "" ) {
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
        if ( message !== "\n" || message !== "" ) {
            if(e.keyCode === 13){
                e.preventDefault();
                handleSubmit(e);
            }
        }
    }

    const audioCall = () => {
        console.log("Audio call");
    }

    const videoCall = () => {

        handleCallingModalOpen();
        var userCalling = {
            userId: userId,
            displayName: displayName
        }
        // videoCallRoom(currentRoomkey, userCalling);
        // openConnection(userId);
        // setVideoCalling(true);
    }

    const endVideoCall = () => {
        // endCall();
        setVideoCalling(false)
    }

    hermes.off(`message-${currentRoomkey}`).on(`message-${currentRoomkey}`, (data) => {
        dispatch(hasUnreadMessages(true));
        dispatch(addMessage(data));
    });

    hermes.off(`videoCallRoom-${currentRoomkey}`).on(`videoCallRoom-${currentRoomkey}`, (data) => {
        setReceiveCaller(data.user);
        if (data.user.userId != userId) {
            handleReceivingCallModalOpen();
        }
    })

    return (
        <div className="content-container messaging">
            { !videoCalling && 
                <div className="">
                    <div className="call-options">
                        <CallIcon className='call-icon' onClick={() => audioCall()}/>
                        <VideocamIcon className='call-icon' onClick={() => videoCall()}/>
                    </div>
                </div>
            }
            {
                videoCalling &&
                    <div style={{color: "white", position: "relative", width: "100%"}}>
                        <Button onClick={() => endVideoCall()}> End Call &nbsp; <CallEndIcon className="end-call"/></Button>
                    </div>
            }
            <div className={videoCalling ? "video-call-container" : "video-call-container closed" }>
                {
                    videoCalling && 
                    <div>
                        {/* <VideoCall userId={userId}/>  */}
                    </div>
                  
                }
            </div>
            
            <div className={`content-container ${videoCalling ? "messaging-container-shrunk" : "messaging-container"}`} >
                {
                    videoCalling && 
                    <div className="chat-divider">Chat</div>
                }
                <MessageList userId={userId}/>
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

            {/* <ReceivingCallModal
                caller={caller.displayName}
                receivingCallModalOpen={receivingCallModalOpen}
                handleReceivingCallModalClose={handleReceivingCallModalClose}
            />

            <CallingRoomModal 
                callingModalOpen={callingModalOpen} 
                handleCallingModalClose={handleCallingModalClose}
            /> */}
        </div>
    )
}

export default Messages;