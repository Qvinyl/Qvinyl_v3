import io from 'socket.io-client';
export const socket = io("http://localhost:7777");

socket.on("connect", () => {
    // console.log(socket.connected);
});

export function joinSocketRoom(roomkey) {
    socket.emit('joinRoom', roomkey);
}

export function onPausePlayMedia(roomkey, playback) {
    socket.emit('pause-play-media', { roomkey, playback });
}

export function voteToSkip(roomkey) {
    console.log(roomkey);
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

socket.on('message', message => {
    console.log(message);
});

