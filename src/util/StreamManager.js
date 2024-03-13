class StreamManager {
    constructor() {
        this.localStream = null;
        this.videoStream = null;
        this.audioStream = null;
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
            
            const tracks = this.localStream.getTracks();
            this.videoStream = tracks.find((track) => track.kind === 'video');
            this.audioStream = tracks.find((track) => track.kind === 'audio');

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
        this.videoStream.enabled = false;
    }

    async getLocalStream() {
        return this.localStream;
    }

    toggleCamera() {
        if (this.videoStream.enabled) {
            this.turnOffCamera();
          
        } else {
            this.turnOnCamera();
        }
    }
    
    turnOffCamera() {
        this.videoStream.enabled = false;
    }
    
    turnOnCamera() {
        this.videoStream.enabled = true;
    }
    


    toggleMicrophone() {
        if (this.audioStream.enabled) {
            this.turnOffMicrophone();
        } else {
            this.turnOnMicrophone();
        }
    }

    turnOffMicrophone() {
        this.audioStream.enabled = false;
    }

    turnOnMicrophone() {
        this.audioStream.enabled = true;
    }

    disconnect() {
        if (this.localStream) {
            this.localStream.getTracks().forEach((track) => track.stop());
            this.localStream = null;
        }
    }
}

export default StreamManager;
