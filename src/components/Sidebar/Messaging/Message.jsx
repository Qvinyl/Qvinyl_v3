import React from 'react';
import SentMessage from './SentMessage';
import ReceivedMessage from './ReceivedMessage';
import SystemMessage from './SystemMessage';
import '../../../css/Messaging.css';

const Message = ({message, userId}) => {
    return (
        <div className="message-container">
            {
                message.type === "system" ? 
                <SystemMessage text={message.text}/>
                :
                <div>
                {
                    message.userId !== userId ? 
                    <ReceivedMessage 
                        text={message.text}
                        name={message.sentBy}
                    />
                    :
                    <SentMessage 
                        text={message.text}
                    />
                }
                </div>
            }
            
        </div>
    )
}

export default Message;