import io from 'socket.io-client';
import { HOSTSITE, MSG_PATH, HOSTSITE_2, MSG_PORT } from '../../config/db_config';
export const hermes = io(`https://${HOSTSITE}`, {
    path: MSG_PATH,
    transports: ['websocket','polling']
});
hermes.on("connect");

export function connectMessagingSocket() {
    if (!hermes.connected) {
        hermes.connect();
    }
}

export function joinMessageRoom(roomkey, user) {
    hermes.emit('joinRoom', {roomkey, user});
}

export function leaveMessageRoom(roomkey, user) {
    hermes.emit('leaveRoom', {roomkey, user});
}

export function sendMessage(roomkey, message) {
    hermes.emit('message', {roomkey, message});
}

export function disconnectMessaging() {
    hermes.disconnect();
}
