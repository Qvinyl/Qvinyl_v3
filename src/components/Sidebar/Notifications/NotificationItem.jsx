import React from 'react';
import Button from '@mui/material/Button';

import '../../../css/Notification.css'

const NotificationItem = ({roomId, roomName, inviter}) => {
    return (
        <div className="notification-container">
            <div className="text-color-light center">
                <b>{inviter}</b> has invited to <b>{roomName}</b>
            </div>
            <div className="button-container">
                <Button variant="contained">
                    Join Room
                </Button>
                <Button className="cancel-button" variant="contained">
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default NotificationItem;