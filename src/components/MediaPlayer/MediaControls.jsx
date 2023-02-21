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
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import Slider from '@mui/material/Slider';
import LinearProgress from '@mui/material/LinearProgress';


const MediaControls = () => {

    const [playback, setPlayback] = useState(false)
    const [fullScreen, setFullScreen] = useState(false)
    const handleOnPlayback = (isPlaying) => {
        setPlayback(isPlaying)
    }

    const handleOnFullScreen = (isFullScreen) => {
        setFullScreen(isFullScreen)
    }

    return (
        <div className="media-controls">
            <div className="progress-bar">
                <LinearProgress variant="determinate" value={80} />
            </div>
            <Table className="media-table">
                <TableBody>
                    <TableRow>
                        <TableCell className="media-button-container media-container">
                            {
                                playback ? 
                                <PlayArrowIcon 
                                    className="icon" 
                                    onClick={() => handleOnPlayback(false)}/> 
                                : 
                                <PauseIcon 
                                    className="icon" 
                                    onClick={() => handleOnPlayback(true)}/>
                            }  
                        </TableCell>
                        <TableCell className="media-button-container media-container ">
                            <div>
                                <SkipNextIcon className="icon"/>
                            </div>
                        </TableCell>
                        <TableCell className="volume-button-container media-container">
                            <div className="volume-container">
                                <VolumeUpIcon className="volume-icon"/>
                                <Slider
                                    className="slider"
                                    size="small"
                                    defaultValue={100}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                />
                            </div>
                            
                        </TableCell>
                        <TableCell className="media-button-extended-container media-container ">
                            <Button className="request-control-button icon" variant="contained">
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
                                    className="icon" 
                                    onClick={() => handleOnFullScreen(false)}/> 
                                : 
                                <FullscreenIcon 
                                    className="icon" 
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