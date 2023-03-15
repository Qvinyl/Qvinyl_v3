import React from 'react';
import '../../../css/Messaging.css';

const SystemMessage = ({text}) => {

    return (
        <div className="system-message-container">
            {text}
        </div>
    )
}

export default SystemMessage;