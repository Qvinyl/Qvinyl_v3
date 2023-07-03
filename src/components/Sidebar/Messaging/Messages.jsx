import {React, useRef, useEffect, useState} from 'react';
import RoundedInputField from '../../Basics/InputField/RoundedInputField';
import FormControl from '@mui/material/FormControl';
import MessageList from './MessageList';
import { hermes, sendMessage } from '../../../features/socketService/HermesService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { hasUnreadMessages } from '../../../store/actions/messagesActions';
import { addMessage } from '../../../store/actions/messagesActions';
import '../../../css/Messaging.css';

const Messages = ({currentRoomkey, userId, displayName}) => {
    const [message, setMessage] = useState("");
    const inputReference = useRef(null);
    
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.userReducer.displayName);


    useEffect(() => {
        inputReference.current.focus();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if ( message === "\n" || message === "" ) {
            return;
        }
        var sendMessageObj = {
            userId: userId,
            displayName: userName, 
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

    hermes.off(`message-${currentRoomkey}`).on(`message-${currentRoomkey}`, (data) => {
        dispatch(hasUnreadMessages(true));
        dispatch(addMessage(data));
    });

    return (
        <div className="container">
            <div className="box message-list-container">
                <MessageList userId={userId}/>
            </div>
            
            <div className="input-field send box box-3">
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
    )
}

export default Messages;