import io from 'socket.io-client';
// export const hermes = io("http://35.235.106.128:9993");
export const hermes = io("http://localhost:9993");

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
