import io from 'socket.io-client';
export const hermes = io("http://localhost:9993");

hermes.on("connect");

export function joinMessageRoom(roomkey, user) {
    hermes.emit('joinRoom', {roomkey, user});
}

export function sendMessage(roomkey, message) {
    hermes.emit('message', {roomkey, message});
}
