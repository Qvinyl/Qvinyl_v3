import io from 'socket.io-client';
import { HOSTSITE, NOT_PATH,  HOSTSITE_2, NOT_PORT } from '../../config/db_config';
export const notifications = io(`https://${HOSTSITE}`, {
    path: NOT_PATH,
    transports: ['websocket','polling']
});

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
