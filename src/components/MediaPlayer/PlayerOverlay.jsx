import '../../css/Player.css'
import MediaControls from './MediaControls';
import Player from './Player';
const PlayerOverlay = () => {
    return (
        <div className="player">
            <div className="player-wrapper">
                <Player/>
                <MediaControls/>
            </div>
        </div>
    )
}

export default PlayerOverlay;