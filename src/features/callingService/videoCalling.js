import { Peer } from "peerjs";

var peer = null;
var localStream = null

export function openConnection(userId) {
    console.log(userId)
    peer = new Peer(userId);
    loadUserVideo(true)
}

function loadUserVideo(enabledAudio) {
    navigator.getUserMedia = navigator.getUserMedia ||
                             navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia ||
                             navigator.msGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true,
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            }
        },
        (stream) => {
            var video = document.getElementById('local-video');
            video.muted = true;
            video.srcObject = stream;
            localStream = stream;
            video.onloadedmetadata = function(e) {
                video.play();
            };
            
            // this.props.callingUserlist.forEach(user => {
            //     if (user.uid !== this.props.uid) {
                    connectToNewUser('p3cinJqPa1OBmyc7infAYM0vgsZ2', stream);
            //     }
            // })

            peer.on('call', (call) => {
                console.log("answering: " + call.peer);
                call.answer(stream);
                var video = document.getElementById(call.peer);
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })
            })
        },
        function(err) {
            console.log("The following error occurred: " + err.name);
        });
    } else {
        console.log("getUserMedia not supported");
    }
}

function connectToNewUser(useruid, stream) {
    const call = peer.call(useruid, stream);
    const video = document.getElementById(useruid);
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    })
    call.on('close', () => {
        video.remove()
    })
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
}


function turnOffVideo() {
    // localStream.getVideoTracks()[0].enabled = false;
    localStream.getVideoTracks()[0].stop();
}

export function turnOffMicrophone() {
    localStream.getAudioTracks()[0].stop();
}

export function cameraToggle(toggle) {
    console.log(localStream.getAudioTracks())
    if (toggle) {
        console.log("turn Camera ON")
        loadUserVideo()
    }
    else {
        console.log("turn Camera OFF")
        turnOffVideo();
    }
}

export function microphoneToggle(toggle) {
    if (toggle) {
        console.log("turn Microphone ON")
        localStream.getAudioTracks()[0].enabled = true
        console.log(localStream.getAudioTracks()[0].enabled)
    }
    else {
        console.log("turn Microphone OFF")
        turnOffMicrophone();
        console.log(localStream.getAudioTracks()[0].enabled = false)
    }
}

export function endCall() {
    // cameraToggle(false);
    // microphoneToggle(false);
    localStream.getTracks().forEach(track => track.stop())
    peer.destroy();
}