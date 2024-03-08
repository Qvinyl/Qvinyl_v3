import Peer from "peerjs";

class PeerService {
    constructor(userId) {
        this.peer = new Peer(userId);
        this.localStream = null;
        
        console.log(this.peer.id);
        
        this.peer.on("call", (call) => {
            console.log("answering peerId: " + call.peer);
            this.answerCall(call);
        });
    }

    async openCamera() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: {
                    mandatory: {
                        googEchoCancellation: false,
                        googAutoGainControl: false,
                        googNoiseSuppression: false,
                        googHighpassFilter: false,
                    },
                    optional: [],
                },
            });

            const video = document.getElementById("local-video");
            if (video) {
                video.muted = true;
                video.srcObject = this.localStream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            } else {
                console.log("Local video element not found");
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    }

    async callUser(userId) {
        if (!this.localStream) {
            console.log("Local stream not initialized");
            return;
        }

        console.log("Call " + userId);

        try {
            const stream = await new Promise((resolve, reject) => {
                navigator.getUserMedia(
                    { video: true, audio: true },
                    (stream) => resolve(stream),
                    (err) => reject(err)
                );
            });

            const call = this.peer.call(userId, stream);
            const video = document.getElementById(userId);

            if (video) {
                call.on("stream", (userVideoStream) => {
                    video.srcObject = userVideoStream;
                });

                call.on("close", () => {
                    video.remove();
                });
            } else {
                console.log("Video element not found for user:", userId);
            }
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    }

    answerCall(call) {
        if (!this.localStream) {
            console.log("Local stream not initialized");
            return;
        }

        call.answer(this.localStream);
        const video = document.getElementById(call.peer);

        if (video) {
            call.on("stream", (userVideoStream) => {
                video.srcObject = userVideoStream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            });

            call.on("close", () => {
                video.remove();
            });
        } else {
            console.log("Video element not found for user:", call.peer);
        }
    }

    disconnect() {
        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => track.stop());
            this.localStream = null;
        }

        this.peer.disconnect();
    }
}

export default PeerService;
