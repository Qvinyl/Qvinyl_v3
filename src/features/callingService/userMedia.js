// // userMedia.js
// var localStream = null;

// // Function to load user's video stream
// export function loadUserVideo(enabledAudio, userId, localStream, addVideoStream) {
//     navigator.getUserMedia = navigator.getUserMedia ||
//                             navigator.webkitGetUserMedia ||
//                             navigator.mozGetUserMedia ||
//                             navigator.msGetUserMedia;

//     if (navigator.getUserMedia) {
//         navigator.getUserMedia({ 
//             video: true,
//             audio: {
//                 mandatory: {
//                     googEchoCancellation: false,
//                     googAutoGainControl: false,
//                     googNoiseSuppression: false,
//                     googHighpassFilter: false
//                 },
//                 optional: []
//             }
//         },
//         (stream) => {
//             var video = document.getElementById(userId);
//             video.muted = true;
//             video.srcObject = stream;
//             localStream = stream;
//             video.onloadedmetadata = function(e) {
//                 video.play();
//             };
//         },
//         function(err) {
//             console.log("The following error occurred: " + err.name);
//         });
//     } else {
//         console.log("getUserMedia not supported");
//     }
// }

// // Function to add video stream to video element
// function addVideoStream(video, stream) {
//     video.srcObject = stream;
//     video.addEventListener('loadedmetadata', () => {
//         video.play();
//     });
// }

// // Function to turn off video
// export function turnOffVideo(localStream) {
//     localStream.getVideoTracks()[0].stop();
// }

// // Function to turn off microphone
// export function turnOffMicrophone(localStream) {
//     localStream.getAudioTracks()[0].stop();
// }

// // Function to toggle camera on/off
// export function cameraToggle(toggle, localStream) {
//     if (toggle) {
//         console.log("turn Camera ON");
//         // loadUserVideo(true, userId, localStream, addVideoStream);
//     } else {
//         console.log("turn Camera OFF");
//         turnOffVideo(localStream);
//     }
// }

// // Function to toggle microphone on/off
// export function microphoneToggle(toggle, localStream) {
//     if (toggle) {
//         console.log("turn Microphone ON");
//         localStream.getAudioTracks()[0].enabled = true;
//         console.log(localStream.getAudioTracks()[0].enabled);
//     } else {
//         console.log("turn Microphone OFF");
//         turnOffMicrophone(localStream);
//         console.log(localStream.getAudioTracks()[0].enabled = false);
//     }
// }

