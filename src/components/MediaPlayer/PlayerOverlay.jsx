import {useState, useRef} from 'react';
import MediaControls from './MediaControls';
import Player from './Player';
import '../../css/Player.css'
const PlayerOverlay = () => {
    const [volume, setVolume] = useState(100);
    const [muted, setMute] = useState(false);
    const [playback, setPlayback] = useState(true);
    const [progress, setProgress] = useState();
    const playerRef = useRef()
    
    const setVolumeLevel = (level) => {
        setVolume(level);
    }

    const setPlaybackState = (isPlaying) => {
        setPlayback(isPlaying);
    }

    const setMuteState = (isMuted) => {
        setMute(isMuted)
    }

    const setProgressValue = (progress) => {
        setProgress(progress)
    }

    return (
        <div className="player">
            <div className="player-wrapper">
                <Player
                    playerRef={playerRef}
                    setProgressValue={setProgressValue}
                    muted={muted}
                    playback={playback}
                    volume={volume}
                />
                <MediaControls
                    progress={progress}
                    muted={muted}
                    isPlaying={playback}
                    volume={volume}
                    setMuteState={setMuteState}
                    setPlaybackState={setPlaybackState}
                    setVolumeLevel={setVolumeLevel}
                />
            </div>
        </div>
    )
}

export default PlayerOverlay;