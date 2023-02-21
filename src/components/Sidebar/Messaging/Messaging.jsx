import {React, useRef, useEffect} from 'react';
import RoundedInputField from '../../Basics/InputField/RoundedInputField';
import MessageList from './MessageList';
import '../../../css/Messaging.css';
const Messaging = () => {
    const inputReference = useRef(null);

    useEffect(() => {
        inputReference.current.focus();
    }, []);

    return (
        <div className="content-container messaging">
            <MessageList/>
            <div className="input-field send" >
                <RoundedInputField 
                    inputRef={inputReference}
                    label="Send a message..." multiline maxRows={4}  />
            </div>
        </div>
    )
}

export default Messaging;