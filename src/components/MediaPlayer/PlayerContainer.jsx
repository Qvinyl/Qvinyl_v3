import {useState, useEffect, useRef} from 'react';
import MediaControls from './MediaControls';
import Player from './Player';
import { getCurrentQueuedElement } from '../../features/queue/Queuing/QueueServices';
import '../../css/Player.css'

const PlayerContainer = () => {
    const [volume, setVolume] = useState(100);
    const [muted, setMute] = useState(false);
    const [playback, setPlayback] = useState(true);
    const [progress, setProgress] = useState("");
    const [currentElement, setCurrentElement] = useState({});
    const playerRef = useRef()

    useEffect(() => {
        getCurrentElement()
    }, []);

    const getCurrentElement = () => {
        getCurrentQueuedElement("43ed9d111e4523fd0572be22ecf3099a", setCurrentElement);
    }
    
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
                    url={currentElement.url}
                />
                <MediaControls
                    title={currentElement.title}
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

export default PlayerContainer;