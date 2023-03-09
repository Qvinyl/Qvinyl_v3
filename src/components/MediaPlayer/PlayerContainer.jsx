import {useState, useEffect, useRef} from 'react';
import MediaControls from './MediaControls';
import Player from './Player';
import { getCurrentQueuedElement } from '../../features/queueService/Queuing/QueueServices';
import '../../css/Player.css'

const PlayerContainer = ({currentRoomkey}) => {
    const [volume, setVolume] = useState(100);
    const [muted, setMute] = useState(false);
    const [playback, setPlayback] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentElement, setCurrentElement] = useState({});
    const playerRef = useRef(null)

    useEffect(() => {
        if (currentRoomkey) {
            getCurrentQueuedElement(currentRoomkey, setCurrentElement);
        }
    }, [currentRoomkey]);
    
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

    const handleOnSeekChange = (progress) => {
        setProgressValue(progress)
        playerRef.current.seekTo(parseFloat(progress/100));
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
                    handleOnSeekChange={handleOnSeekChange}
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