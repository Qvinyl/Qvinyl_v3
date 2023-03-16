import React from 'react';
import Button from '@mui/material/Button';
import { acceptInvitation } from '../../../features/notificationService/Invitations';
import '../../../css/Notification.css'

const NotificationItem = ({invitationId, roomName, inviter, index, removeOnSuccess}) => {

    const acceptInvite = (index) => {
        if (acceptInvitation(invitationId)) {
            removeOnSuccess(index)
        }
    }

    return (
        <div className="notification-container">
            <div className="text-color-light center">
                <b>{inviter}</b> has invited to <b>{roomName}</b>
            </div>
            <div className="button-container">
                <Button variant="contained" size="small" onClick={() => {acceptInvite(index)}}>
                    Join Room
                </Button>
                <Button className="cancel-button" variant="contained" size="small">
                    Decline
                </Button>
            </div>
        </div>
    )
}

export default NotificationItem;