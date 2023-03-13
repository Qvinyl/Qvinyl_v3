import {useState, useEffect, useRef} from 'react';
import MediaControls from './MediaControls';
import Player from './Player';
import RequestControlModal from '../Basics/Modals/RequestControlModal';
import { getCurrentQueuedElement } from '../../features/queueService/Queuing/QueueServices';
import { socket, onSeek, onPausePlayMedia } from '../../features/socketService/SyncService';
import '../../css/Player.css'

const PlayerContainer = ({currentRoomkey, displayName, userId}) => {
    const [volume, setVolume] = useState(100);
    const [muted, setMute] = useState(false);
    const [playback, setPlayback] = useState(true);
    const [progress, setProgress] = useState(0);
    const [controlModalOpen, setControlModalOpen] = useState(false)
    const [currentElement, setCurrentElement] = useState({});
    const [requester, setRequester] = useState({});
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

    const handleControlModalClose = () => {
        setControlModalOpen(false);
    }

    socket.on(`seeking-${currentRoomkey}`, (data) => {
        setProgressValue(data.progress);
        playerRef.current.seekTo(data.progress + 0.000005);
    })

    socket.on(`playback-${currentRoomkey}`, (data) => {
        setPlayback(data.playback);
    })

    socket.on(`request-control-${currentRoomkey}`, (data) => {
        // console.log(data);
        setControlModalOpen(true);
        setRequester(data.user);
    })
    
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
                    displayName={displayName}
                    userId={userId}
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
            </div>

            <RequestControlModal  
                requester={requester}
                controlModalOpen={controlModalOpen}
                handleControlModalClose={handleControlModalClose}
                currentRoomkey={currentRoomkey}
            />
        </div>
    )
}

export default PlayerContainer;