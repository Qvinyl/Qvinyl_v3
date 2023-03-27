import io from 'socket.io-client';
import { HOSTSITE, NOT_PORT } from '../../config/db_config';
export const notifications = io(`http://${HOSTSITE}:${NOT_PORT}`);

notifications.on("connect");

export function connectMessagingSocket() {
    if (!notifications.connected) {
        notifications.connect();
    }
}

export function sendNotification(userId) {
    notifications.emit('send-Invitation', {userId});
}

export function disconnectNotifications() {
    notifications.disconnect();
}
