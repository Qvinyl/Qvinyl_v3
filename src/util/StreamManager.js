class StreamManager {
    constructor() {
        this.localStream = null;
        this.camera = true;
        this.microphone = true;
    }

    async openCamera() {
        console.log("Opening Camera");
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


    async stopCamera() {
        // Stop the local stream if it exists
        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => track.stop());
            this.localStream = null;
        }
    }

    // async openCamera() {
    //     console.log("Opening Camera")
    //     try {
    //         this.localStream = await navigator.mediaDevices.getUserMedia({
    //             video: true,
    //             audio: {
    //                 mandatory: {
    //                     googEchoCancellation: false,
    //                     googAutoGainControl: false,
    //                     googNoiseSuppression: false,
    //                     googHighpassFilter: false,
    //                 },
    //                 optional: [],
    //             },
    //         });

    //         const video = document.getElementById("local-video");
    //         if (video) {
    //             video.muted = true;
    //             video.srcObject = this.localStream;
    //             video.onloadedmetadata = () => {
    //                 video.play();
    //             };
    //         } else {
    //             console.log("Local video element not found");
    //         }
    //     } catch (error) {
    //         console.error("Error accessing media devices:", error);
    //     }
    // }

    async getLocalStream() {
        return this.localStream;
    }

    // toggleCamera() {
    //     if (!this.camera) {
    //         this.turnOnCamera();
    //         this.camera = !this.camera;
    //     } else {
    //         this.turnOffCamera();
    //         this.camera = !this.camera;
    //     }
    // }

    // turnOffCamera() {
    //     console.log("Turn off Camera");
    //     this.localStream.getVideoTracks()[0].stop();
    // }

    // turnOnCamera() {
    //     console.log("Turn on Camera");
    //     this.openCamera();
    // }

    async toggleCamera() {
        try {
            if (!this.camera) {
                // Turn on the camera
                await this.turnOnCamera();
            } else {
                // Turn off the camera
                await this.turnOffCamera();
            }
            // Toggle the camera state
            this.camera = !this.camera;
        } catch (error) {
            console.error("Error toggling camera:", error);
        }
    }
    
    async turnOffCamera() {
        console.log("Turn off Camera");
        await this.stopCamera();
    }
    
    async turnOnCamera() {
        console.log("Turn on Camera");
        await this.openCamera();
    }
    


    toggleMicrophone() {
        console.log(this.localStream);
        if (!this.microphone) {
            this.turnOnMicrophone();
            this.microphone = !this.microphone;
        } else {
            this.turnOffMicrophone();
            this.microphone = !this.microphone;
        }
    }

    turnOffMicrophone() {
        const audioTracks = this.localStream.getAudioTracks();
        if (audioTracks.length > 0) {
            audioTracks[0].enabled = false;
            console.log("Microphone turned off");
        }
    }

    turnOnMicrophone() {
        const audioTracks = this.localStream.getAudioTracks();
        if (audioTracks.length > 0) {
            audioTracks[0].enabled = true;
            console.log("Microphone turned off");
        }
    }

    disconnect() {
        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => track.stop());
            this.localStream = null;
        }
    }
}

export default StreamManager;
