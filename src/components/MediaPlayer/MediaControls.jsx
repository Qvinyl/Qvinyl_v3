import {React, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Slider from '@mui/material/Slider';
import LinearProgress from '@mui/material/LinearProgress';


const MediaControls = ({setVolumeLevel, setPlaybackState, volume, isPlaying, setMuteState, muted, progress}) => {
    const [playback, setPlayback] = useState(isPlaying)
    const [isMuted, setMute] = useState(muted)
    const [fullScreen, setFullScreen] = useState(false)

    const handleOnPlayback = (isPlaying) => {
        setPlaybackState(isPlaying)
        setPlayback(isPlaying)
    }

    const handleOnFullScreen = (isFullScreen) => {
        setFullScreen(isFullScreen)
    }

    const handleVolumeOnChange = (event) => {
        event.preventDefault();
        var level = event.target.value;
        setVolumeLevel(level/100);
    }

    const handleMuteOnChange = (muted) => {
        setMute(muted)
        setMuteState(muted);
    }

    const volumeValue = () => {
        return Math.round(volume * 100);
    }

    return (
        <div className="media-controls">
            <div style={{height: "100%", width: "100%"}} onClick={() => handleOnPlayback(!playback)}/>
            <div className="progress-bar">
                <LinearProgress variant="determinate" value={progress} />
            </div>
            <Table className="media-table">
                <TableBody>
                    <TableRow>
                        <TableCell className="media-button-container media-container">
                            {
                                playback ? 
                                <PauseIcon 
                                    className="player-icon" 
                                    onClick={() => handleOnPlayback(false)}
                                />
                                : 
                                <PlayArrowIcon 
                                    className="player-icon" 
                                    onClick={() => handleOnPlayback(true)}
                                /> 
                            }  
                        </TableCell>
                        <TableCell className="media-button-container media-container ">
                            <div>
                                <SkipNextIcon className="player-icon"/>
                            </div>
                        </TableCell>
                        <TableCell className="volume-button-container media-container">
                            <div className="volume-container">
                                {
                                    isMuted ? 
                                    <VolumeOffIcon 
                                        onClick={() => handleMuteOnChange(false)}
                                        className="volume-icon"/> 
                                    : 
                                    <VolumeUpIcon 
                                        onClick={() => handleMuteOnChange(true)}
                                        className="volume-icon"/>
                                }
                                
                                <Slider
                                    className="slider"
                                    size="small"
                                    onChange={handleVolumeOnChange}
                                    value={volumeValue()}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                />
                            </div>
                            
                        </TableCell>
                        <TableCell className="media-button-extended-container media-container ">
                            <Button className="request-control-button player-icon" variant="contained">
                                Request Control
                            </Button>
                        </TableCell>
                        <TableCell className="media-container">
                            <div className="text-color-light">
                                Title of the Song of Video that is playing
                            </div>
                        </TableCell>
                        <TableCell className="media-button-container media-container ">
                            {
                                fullScreen ?
                                <FullscreenExitIcon 
                                    className="player-icon" 
                                    onClick={() => handleOnFullScreen(false)}/> 
                                : 
                                <FullscreenIcon 
                                    className="player-icon" 
                                    onClick={() => handleOnFullScreen(true)}/>
                            }  
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default MediaControls;