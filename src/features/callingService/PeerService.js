import Peer from "peerjs";
import StreamManager from "../../util/StreamManager";

class PeerService {
    constructor(userId) {
        this.peer = new Peer(userId);
        this.streamManager = new StreamManager();
        this.callList = [];
        this.peer.on("call", (call) => {
            this.callList.push(call);
        });
    }

    async openCamera() {
        console.log("Turning on Camera");
        try {
            const stream = await this.streamManager.getLocalStream();
            if (!stream) {
                // Camera is not open, open it
                await this.streamManager.openCamera();

                // If there are existing calls, re-establish them with the new stream
                await this.answerCalls();
            }
        } catch (error) {
            console.error("Error opening camera:", error);
        }
    }

    async toggleCamera() {
        console.log("Toggle Camera");
        try {
            // Check if the camera is currently on
            const stream = await this.streamManager.getLocalStream();
            if (!stream) {
                // Camera is on, turn it off
                await this.openCamera();

            } else {
                // Camera is off, turn it on
                await this.turnOffCamera();
            }
        } catch (error) {
            console.error("Error toggling camera:", error);
        }
    }

    async turnOffCamera() {
        console.log("Turning off Camera");
        try {
            // Stop the video tracks in the local stream
            this.streamManager.stopCamera();

        } catch (error) {
            console.error("Error turning off camera:", error);
        }
    }

    async callUser(userId) {
        // Ensure the camera is open before calling
        if (!this.streamManager.getLocalStream()) {
            await this.openCamera();
        }

        try {
            // Get the local stream
            const stream = await this.streamManager.getLocalStream();

            // Call the user with the obtained stream
            const call = this.peer.call(userId, stream);

            // Handle the call events
            this.handleCallEvents(call);
        } catch (error) {
            console.error("Error accessing media devices:", error);
        }
    }

    handleCallEvents(call) {
        const userId = call.peer;
        const videoElementId = userId; // Assuming video element id is same as userId

        // Resolve the video element for the call
        const videoPromise = new Promise((resolve) => {
            function checkVideoElement() {
                const video = document.getElementById(videoElementId);
                if (video) {
                    resolve(video);
                } else {
                    setTimeout(checkVideoElement, 100);
                }
            }
            checkVideoElement();
        });

        call.on("stream", async (userVideoStream) => {
            const video = await videoPromise;
            video.srcObject = userVideoStream;
            video.onloadedmetadata = () => {
                video.play();
            };
        });

        // Handle close event
        call.on("close", () => {
            const video = document.getElementById(videoElementId);
            if (video) {
                video.srcObject = null;
                video.remove();
            }
        });
    }


    getCallList() {
        return this.callList;
    }

    async reestablishCalls() {
        for (var call of this.callList) {
            this.answerCall(call);
        }
    }

    async answerCalls() {
        for (var call of this.callList) {
            this.answerCall(call);
        }
    }

    async answerCall(call) {
        console.log("calling: " + call.peer);
        const stream = await this.streamManager.getLocalStream();
        if (!stream) {
            await this.streamManager.openCamera();
        }
        console.log("Answering Call");
        
        call.answer(stream);
        const videoPromise = new Promise((resolve) => {
            // Function to check if the video element with the specified ID is available
            function checkVideoElement() {
                const video = document.getElementById(call.peer);
                if (video) {
                    resolve(video);
                } else {
                    // Retry after a short delay if the video element is not available yet
                    setTimeout(checkVideoElement, 100);
                }
            }
            // Start checking for the video element
            checkVideoElement();
        });

        try {
            const video = await videoPromise; // Await for the video element

            call.on("stream", (userVideoStream) => {
                video.srcObject = userVideoStream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            });

            call.on("close", () => {
                video.remove();
            });
        } catch (error) {
            console.log("Answering Call, but video element not found for user:", call.peer);
        }
    }

    disconnect() {
        if (this.streamManager.getLocalStream()) {
            this.streamManager.getLocalStream().getTracks().forEach((track) => track.stop());
        }
        this.peer.disconnect();
    }

    

    disconnectCalls() {
        // Hang up all existing calls
        for (const call of this.callList) {
            call.close();
        }
    }
}

export default PeerService;
