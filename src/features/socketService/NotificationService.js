import io from 'socket.io-client';
// export const notifications = io("http://35.235.106.128:5240");
export const notifications = io("http://localhost:5240");

notifications.on("connect");

export function connectMessagingSocket() {
    if (!notifications.connected) {
        notifications.connect();
    }
}

export function sendNotification(userId) {
    console.log(userId);
    notifications.emit('send-Invitation', {userId});
}

export function disconnectNotifications() {
    notifications.disconnect();
}
