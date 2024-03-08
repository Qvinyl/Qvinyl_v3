import { Peer } from "peerjs";

var peer = null;
var localStream = null;

export function openConnection(userId) {
    // Create a new Peer instance with the provided userId
    peer = new Peer(userId);
    
    peer.on('call', call => {
        const peerId = call.peer;
        console.log("answering peerId: " + peerId );
        // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        //     .then(stream => {
        //         call.answer(stream);
        //         const peerId = call.peer;
        //         console.log("answering peerId: " + peerId );
        //         call.on('stream', remoteStream => {
        //             var video = document.getElementById(peerId);
        //             video.srcObject = remoteStream;
        //         });
        //     })
        //     .catch(error => {
        //         console.error('Error accessing media devices:', error);
        //     });
    });
    
    return peer;
}

// Call Users
export function openCamera() {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    if (!navigator.getUserMedia) {
        console.log('getUserMedia is not supported in this browser');
        return;
    }

    navigator.getUserMedia({
        video: true,
        audio: {
            mandatory: {
                googEchoCancellation: false,
                googAutoGainControl: false,
                googNoiseSuppression: false,
                googHighpassFilter: false
            },
            optional: []
        }
    },
        // Success callback function when access is granted
        async (stream) => {
            // Get the video element by its userId and set its properties
            await new Promise((resolve, reject) => {
                var video = document.getElementById("local-video");
                video.muted = true; // Mute the local video stream
                video.srcObject = stream; // Set the stream as the video source
                video.onloadedmetadata = function (e) {
                    video.play(); // Start playing the video
                    resolve();
                };
            });
        }, function (err) {
            console.log('Failed to get local stream', err);
        });
}

// Call User 
export function callUser(userId) {
    if (!peer) {
        console.log('Peer not initialized');
        return;
    }

    navigator.getUserMedia({ video: true, audio: true },
        (stream) => {
            console.log("Calling user: " + userId);
            const call = peer.call(userId, stream);

            const video = document.getElementById(userId);
            if (video) {
                call.on('stream', userVideoStream => {
                    video.srcObject = userVideoStream;
                });

                call.on('close', () => {
                    video.remove();
                });
            } else {
                console.log('Video element not found for user: ' + userId);
            }
        },
        (err) => {
            console.error('Error accessing media devices:', err);
        }
    );
}



// // Answer Call
// export function receiveCallAndStreamVideo(userId) {
//     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
//     peer.on('call', function (call) {
//         getUserMedia({ video: true, audio: true }, function (stream) {
//             call.answer(stream); // Answer the call with an A/V stream.
//             const peerId = call.peer;
//             console.log("answering: " + peerId);
//             call.on('stream', function (remoteStream) {
//                 var video = document.getElementById(userId);
//                 video.muted = true; // Mute the local video stream
//                 video.srcObject = remoteStream; // Set the stream as the video source
//                 localStream = remoteStream; // Store the local video stream
//                 video.onloadedmetadata = function (e) {
//                     video.play(); // Start playing the video
//                 };
//             });
//         }, function (err) {
//             console.log('Failed to get local stream', err);
//         });
//     });
// }


// // Function to open connection and load user's video
// export function openConnection(userId) {
//     console.log(userId);
//     // Create a new Peer instance with the provided userId
//     peer = new Peer(userId);
//     // Load user's video
//     loadUserVideo(true, userId);
// }

// Function to load user's video stream
function loadUserVideo(enabledAudio, userId) {
    // Check if getUserMedia is supported by the browser
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
        // Request access to the user's camera and microphone
        navigator.getUserMedia({
            video: true,
            audio: {
                mandatory: {
                    googEchoCancellation: false,
                    googAutoGainControl: false,
                    googNoiseSuppression: false,
                    googHighpassFilter: false
                },
                optional: []
            }
        },
            // Success callback function when access is granted
            (stream) => {
                // Get the video element by its userId and set its properties
                var video = document.getElementById(userId);
                video.muted = true; // Mute the local video stream
                video.srcObject = stream; // Set the stream as the video source
                localStream = stream; // Store the local video stream
                video.onloadedmetadata = function (e) {
                    video.play(); // Start playing the video
                };

                peer.on('call', (call) => {
                    const peerId = call.peer;
                    console.log("answering: " + peerId);
                    call.answer(stream);
                    var video = document.getElementById(peerId);
                    call.on('stream', userVideoStream => {
                        addVideoStream(video, userVideoStream);
                    })
                });
            },
            // Error callback function if access is denied or an error occurs
            function (err) {
                console.log("The following error occurred: " + err.name);
            });
    } else {
        // If getUserMedia is not supported, log an error message
        console.log("getUserMedia not supported");
    }
}

// Function to connect to a new user and handle stream
export function connectToNewUser(userId) {
    console.log(localStream)
    // Initiate a call to the specified useruid with the provided stream
    const call = peer.call(userId, localStream);

    // Get the video element corresponding to the useruid
    const video = document.getElementById(userId);

    // When a stream is received from the remote user, add it to the video element
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });

    // When the call is closed, remove the corresponding video element from the DOM
    call.on('close', () => {
        video.remove();
    });
}

// Function to add video stream to video element
function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
}

// Function to turn off video
function turnOffVideo() {
    localStream.getVideoTracks()[0].stop();
}

// Function to toggle camera on/off
export function cameraToggle(toggle) {
    if (toggle) {
        console.log("turn Camera ON");
        // loadUserVideo();
    } else {
        console.log("turn Camera OFF");
        turnOffVideo();
    }
}

// Function to turn off microphone
export function turnOffMicrophone() {
    localStream.getAudioTracks()[0].stop();
}

// Function to toggle microphone on/off
export function microphoneToggle(toggle) {
    if (toggle) {
        console.log("turn Microphone ON");
        localStream.getAudioTracks()[0].enabled = true;
        console.log(localStream.getAudioTracks()[0].enabled);
    } else {
        console.log("turn Microphone OFF");
        turnOffMicrophone();
        console.log(localStream.getAudioTracks()[0].enabled = false);
    }
}

// Function to end call
export function endCall() {
    localStream.getTracks().forEach(track => track.stop());
    peer.destroy();
}
