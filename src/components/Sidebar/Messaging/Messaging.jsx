import {React, useRef, useEffect, useState} from 'react';
import RoundedInputField from '../../Basics/InputField/RoundedInputField';
import FormControl from '@mui/material/FormControl';
import MessageList from './MessageList';
import { hermes, sendMessage } from '../../../features/socketService/HermesService';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../../store/actions/messagesActions';
import '../../../css/Messaging.css';

const Messaging = ({currentRoomkey, userId, displayName}) => {
    const [message, setMessage] = useState("");
    const inputReference = useRef(null);

    const dispatch = useDispatch();

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
        if (message !== "" || message !== "\n") {
            if(e.keyCode === 13){
                handleSubmit(e);
            }
        }
    }

    hermes.off(`message-${currentRoomkey}`).on(`message-${currentRoomkey}`, (data) => {
        dispatch(addMessage(data));
    });

    return (
        <div className="content-container messaging">
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
    )
}

export default Messaging;