import io from 'socket.io-client';
import { CONNECTION_TYPE, HOSTSITE, MSG_PATH } from '../../config/db_config';
export const hermes = io(`${CONNECTION_TYPE}$${HOSTSITE}`, {
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
