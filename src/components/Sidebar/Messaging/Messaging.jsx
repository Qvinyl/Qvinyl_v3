import {React, useRef, useEffect, useState} from 'react';
import RoundedInputField from '../../Basics/InputField/RoundedInputField';
import FormControl from '@mui/material/FormControl';
import MessageList from './MessageList';
import { hermes, sendMessage } from '../../../features/socketService/HermesService';
import '../../../css/Messaging.css';

const Messaging = ({currentRoomkey, userId, displayName}) => {
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");
    const inputReference = useRef(null);

    useEffect(() => {
        inputReference.current.focus();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
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
        if(e.keyCode === 13){
           handleSubmit(e);
        }
    }

    hermes.on(`message-${currentRoomkey}`, (data) => {
        setMessageList([...messageList, data])
    });

    return (
        <div className="content-container messaging">
            <MessageList 
                messageList={messageList} userId={userId}/>
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
    )
}

export default Messaging;