import io from 'socket.io-client';
import { CONNECTION_TYPE, HOSTSITE, MSG_PATH } from '../../config/db_config';
// export const hermes = io(`${CONNECTION_TYPE}${HOSTSITE}`, {
//     path: MSG_PATH,
//     transports: ['websocket','polling']
// });
export const hermes = io(`${CONNECTION_TYPE}${HOSTSITE}${MSG_PATH}`);
hermes.on("connect");

export function connectMessagingSocket() {
    if (!hermes.connected) {
        hermes.connect();
    }
}

export function joinMessageRoom(roomkey, user) {
    var user = {
        displayName: user.display_name,
        userId: user.user_id
    }
    hermes.emit('joinRoom', {roomkey, user});
}

export function sendMessage(roomkey, message) {
    hermes.emit('message', {roomkey, message});
}

export function getActiveUserList(roomkey) {
    hermes.emit('active-userlist', {roomkey})
}

export function leaveMessageRoom(roomkey, user) {
    hermes.emit('leaveRoom', {roomkey, user});
}

export function videoCallRoom(roomkey, user) {
    hermes.emit('videoCallRoom', {roomkey, user});
}

export function joinCall(roomkey, user) {
    hermes.emit('joinCall', {roomkey, user});
}

export function declineCall(roomkey, user) {
    hermes.emit('joinCall', {roomkey, user});
}

export function cancelCall(roomkey, user) {
    hermes.emit('joinCall', {roomkey, user});
}

export function acceptCall(roomkey, user) {
    hermes.emit('joinCall', {roomkey, user});
}


// export function videoCall(roomkey, user) {
//     hermes.emit('cancelVideoCall', {roomkey, user});
// }

export function disconnectMessaging() {
    hermes.disconnect();
}