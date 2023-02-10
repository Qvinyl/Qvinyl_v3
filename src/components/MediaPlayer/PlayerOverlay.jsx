import '../../css/Player.css'
import MediaControls from './MediaControls';
import Player from './Player';
const PlayerOverlay = () => {
    return (
        <div className="player">
            <Player/>
            <MediaControls/>
        </div>
    )
}

export default PlayerOverlay;