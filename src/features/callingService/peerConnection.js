// // peerConnection.js

// import { Peer } from "peerjs";

// let peer = null;

// // Function to create a peer connection
// export function createPeerConnection(userId) {
//     console.log(userId);
//     peer = new Peer(userId);
// }

// // Function to connect to a new user and handle stream
// export function connectToNewUser(userId, localStream, addVideoStream) {
//     // peer.on('call', (call) => {
//     //     console.log("answering: " + call.peer);
//     //     var video = document.getElementById(call.peer);
//     //     call.on('stream', userVideoStream => {
//     //         addVideoStream(call.peer, userVideoStream)
//     //     })
//     // })

//     // console.log(localStream);
//     const call = peer.call(userId, localStream);
    
//     call.on('stream', userVideoStream => {
//         addVideoStream(userId, userVideoStream);
//     });

//     call.on('close', () => {
//         // Handle call closed
//     });
// }

// // Function to end call
// export function endCall(localStream) {
//     localStream.getTracks().forEach(track => track.stop());
//     peer.destroy();
// }



