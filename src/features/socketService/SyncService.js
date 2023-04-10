import io from 'socket.io-client';
import { HOSTSITE, SYNC_PATH,  HOSTSITE_2, SYNC_PORT } from '../../config/db_config';
export const socket = io(`https://${HOSTSITE}`, {
    path: SYNC_PATH,
    transports: ['websocket','polling']
});

export function connectSocket() {
    if (!socket.connected) {
        socket.connect();
    }
}

socket.on("connect", () => {
    // console.log(socket.connected);
});

export function joinSocketRoom(roomkey) {
    socket.emit('joinRoom', roomkey);
}

export function leaveSocketRoom(roomkey) {
    socket.emit('leaveRoom', roomkey);
}

export function onPausePlayMedia(roomkey, playback) {
    socket.emit('pause-play-media', { roomkey, playback });
}

export function voteToSkip(roomkey) {
    socket.emit('vote-to-skip', { roomkey });
}

export function requestingMediaControl(roomkey, user) {
    socket.emit('request-control', { roomkey, user });
}

export function grantMediaControl(roomkey) {
    socket.emit('grant-control', { roomkey });
}

export function onMediaEnded(roomkey) {
    socket.emit('media-ended', { roomkey });
}

export function onSeek(roomkey, progress) {
    socket.emit(`onSeek`, { 
            roomkey: roomkey,
            onSeekProgress: progress 
        }
    );
}

export function syncUp(roomkey) {
    socket.emit(`sync-up`, { 
        roomkey: roomkey
    });
}

export function onSyncRoom(roomkey, progress) {
    socket.emit(`sync-room`, { 
        roomkey: roomkey,
        progress: progress 
    });
}

export function disconnectSocket() {
    socket.disconnect();
}

socket.on('message', message => {
    console.log(message);
});

