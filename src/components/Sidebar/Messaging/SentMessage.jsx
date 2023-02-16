import React from 'react';
import '../../../css/Messaging.css';

const SentMessage = ({text}) => {

    return (
        <div className="message-container">
            <div className="sent-message">
                <div className="sent">
                    {text}
                </div>
            </div>
        </div>
    )
}

export default SentMessage;