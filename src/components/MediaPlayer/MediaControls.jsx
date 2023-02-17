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
            <Table className="media-table">
                <TableBody>
                    <TableRow>
                        <TableCell className="media-button-container media-container">
                            {
                                playback ? <PlayArrowIcon onClick={() => handleOnPlayback(false)}/> : <PauseIcon onClick={() => handleOnPlayback(true)}/>
                            }  
                        </TableCell>
                        <TableCell className="media-button-container media-container ">
                            <SkipNextIcon/>
                        </TableCell>
                        <TableCell className="volume-button-container media-container ">
                            <div className="volume-container">
                                <VolumeUpIcon/>
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
                            <Button className="request-control-button" variant="contained">
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
                                fullScreen ? <FullscreenExitIcon onClick={() => handleOnFullScreen(false)}/> : <FullscreenIcon onClick={() => handleOnFullScreen(true)}/>
                            }  
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default MediaControls;