import React from 'react';
import '../../../css/Messaging.css';

const ReceivedMessage = ({text, name}) => {

    return (
        <div className="message-container">
            <div className="received-message">
                <div className="received">
                    {text}
                </div>
                <div className="text-label">{name}</div>
            </div>
        </div>
    )
}

export default ReceivedMessage;