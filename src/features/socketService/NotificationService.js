import io from 'socket.io-client';
import { CONNECTION_TYPE, HOSTSITE, NOT_PATH } from '../../config/db_config';
// export const notifications = io(`${CONNECTION_TYPE}${HOSTSITE}`, {
//     path: NOT_PATH,
//     transports: ['websocket','polling']
// });

export const notifications = io(`${CONNECTION_TYPE}${HOSTSITE}${NOT_PATH}`)
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
