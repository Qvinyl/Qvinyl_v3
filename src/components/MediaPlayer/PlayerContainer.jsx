import {useState, useEffect, useRef} from 'react';
import MediaControls from './MediaControls';
import Player from './Player';
import { getCurrentQueuedElement } from '../../features/queueService/Queuing/QueueServices';
import { socket, onSeek, onPausePlayMedia } from '../../features/socketService/SyncService';
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
        onSeek(currentRoomkey, progress/100);
        onPausePlayMedia(currentRoomkey, isPlaying);
    }

    const setMuteState = (isMuted) => {
        setMute(isMuted)
    }

    const setProgressValue = (progress) => {
        setProgress(progress)
    }

    const handleOnSeekChange = (progress) => {
        var onSeekProgress = parseFloat(progress/100)
        setProgressValue(progress)
        onSeek(currentRoomkey, onSeekProgress);
        playerRef.current.seekTo(onSeekProgress);
    }

    socket.on(`seeking-${currentRoomkey}`, (data) => {
        setProgressValue(data.progress);
        playerRef.current.seekTo(data.progress + 0.000005);
    })

    socket.on(`playback-${currentRoomkey}`, (data) => {
        setPlayback(data.playback);
    })
    
    return (
        <div className="player">
            <div className="player-wrapper">
                <Player
                    ref={playerRef}
                    playerRef={playerRef}
                    setProgressValue={setProgressValue}
                    muted={muted}
                    playback={playback}
                    volume={volume}
                    url={currentElement.url}
                />
                <MediaControls
                    currentRoomkey={currentRoomkey}
                    handleOnSeekChange={handleOnSeekChange}
                    title={currentElement.title}
                    progress={progress}
                    muted={muted}
                    playback={playback}
                    volume={volume}
                    setMuteState={setMuteState}
                    setPlaybackState={setPlaybackState}
                    setVolumeLevel={setVolumeLevel}
                />

                {/* <RequestingControlModal/> */}
            </div>
        </div>
    )
}

export default PlayerContainer;