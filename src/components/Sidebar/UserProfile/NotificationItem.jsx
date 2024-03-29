import React from 'react';
import Button from '@mui/material/Button';
import { acceptInvitation, declineInvitation } from '../../../features/notificationService/Invitations';
import '../../../css/Notification.css'

const NotificationItem = ({invitationId, roomName, inviter, index, removeOnSuccess, roomkey, joinRoom}) => {

    const acceptInvite = async (index) => {
        var results = await acceptInvitation(invitationId);
        if (results) {
            removeOnSuccess(index);
            joinRoom(roomkey);
        }
    }

    const declineInvite = async (index) => {
        var results = await declineInvitation(invitationId);
        if (results) {
            removeOnSuccess(index);
        }
    }

    return (
        <div className="notification-container">
            <div className="text text-color-light center">
                <b>{inviter}</b> has invited you to <b>{roomName}</b>
            </div>
            <div className="button-container">
                <Button variant="contained" size="small" onClick={() => {acceptInvite(index)}}>
                    Join Room
                </Button>
                <Button className="cancel-button"  variant="contained" size="small" onClick={() => {declineInvite(index)}}>
                    Decline
                </Button>
            </div>
        </div>
    )
}

export default NotificationItem;