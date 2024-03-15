import {useState, useEffect, useRef} from 'react';
import MediaControls from './MediaControls';
import Player from './Player';
import RequestControlModal from '../Basics/Modals/RequestControlModal';
import { getCurrentQueuedElement } from '../../features/queueService/Queuing/QueueServices';
import { socket, onSeek, onPausePlayMedia, onMediaEnded, onSyncRoom } from '../../features/socketService/SyncService';
import '../../css/Player.css'

const PlayerContainer = ({user, roomData, contentPlay}) => {
    const [volume, setVolume] = useState(100);
    const [muted, setMute] = useState(false);
    const [playback, setPlayback] = useState(true);
    const [progress, setProgress] = useState(0);
    const [controlModalOpen, setControlModalOpen] = useState(false)
    const [currentElement, setCurrentElement] = useState('');
    const [requester, setRequester] = useState({});
    const [hasControl, setHasControl] = useState(true)
    const playerRef = useRef(null)  
    const currentRoomkey = user.current_room_id;

    useEffect(() => {  
        if (currentRoomkey) {
            getSongElement();
            setHasControl(roomData.admin === user.user_id);
        }
    }, [roomData, user.user_id]);
    
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
        var onSeekProgress = parseFloat(progress/100);
        setProgressValue(progress)
        onSeek(currentRoomkey, onSeekProgress);
        playerRef.current.seekTo(onSeekProgress);
    }

    const handleOnReady = () => {
        contentPlay(true);
        playerRef.current.seekTo(0);
    }

    const handleControlModalClose = () => {
        setControlModalOpen(false);
    }

    const handleOnVideoEnded = () => {
        onMediaEnded(currentRoomkey);
        setTimeout(() => {
            contentPlay(false);
        }, 2000)
    }

    const getSongElement = async () => {
        getCurrentQueuedElement(currentRoomkey, setCurrentElement);       
    }

    socket.off(`seeking-${currentRoomkey}`).on(`seeking-${currentRoomkey}`, (data) => {
        setProgressValue(data.progress);
        playerRef.current.seekTo(data.progress + 0.000005);
    });

    socket.on(`playback-${currentRoomkey}`, (data) => {
        setPlayback(data.playback);
    });

    socket.on(`request-control-${currentRoomkey}`, (data) => {
        setControlModalOpen(true);
        setRequester(data.user);
    });

    socket.on(`granted-control-${currentRoomkey}`, (data) => {
        setHasControl(data.user === user.user_id)
        if (roomData.admin === user.user_id) {
            setHasControl(roomData.admin === user.user_id);
        }
    });

    socket.off(`sync-up-${currentRoomkey}`).on(`sync-up-${currentRoomkey}`, () => {
        onSyncRoom(currentRoomkey, progress/100);
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
                    handleOnVideoEnded={handleOnVideoEnded}
                    handleOnReady={handleOnReady}
                />
                <MediaControls
                    hasControl={hasControl}
                    user={user}
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