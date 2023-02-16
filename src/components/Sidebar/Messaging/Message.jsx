import React from 'react';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';
import '../../../css/Messaging.css';

const Message = ({message}) => {

    return (
       
        <div className="message-container">
            {
                message.received ? 
                <ReceivedMessage 
                    text={message.text}
                    name={message.user.name}
                />
                :
                <SentMessage 
                    text={message.text}
                />
            }
        </div>
    )
}

export default Message;