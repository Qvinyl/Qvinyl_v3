import {useState} from 'react';
import MediaControls from './MediaControls';
import Player from './Player';
import '../../css/Player.css'
const PlayerOverlay = () => {
    const [volume, setVolume] = useState(100);
    const [playback, setPlayback] = useState(true);
    
    const setVolumeLevel = (level) => {
        setVolume(level);
    }

    const setPlaybackState = (isPlaying) => {
        setPlayback(isPlaying);
    }

    return (
        <div className="player">
            <div className="player-wrapper">
                <Player
                    playback={playback}
                    volume={volume}
                />
                <MediaControls
                    volume={volume}
                    setPlaybackState={setPlaybackState}
                    setVolumeLevel={setVolumeLevel}
                />
            </div>
        </div>
    )
}

export default PlayerOverlay;