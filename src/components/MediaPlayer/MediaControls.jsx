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
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="media-button-container">
                            {
                                playback ? <PlayArrowIcon onClick={() => handleOnPlayback(false)}/> : <PauseIcon onClick={() => handleOnPlayback(true)}/>
                            }  
                        </TableCell>
                        <TableCell className="media-button-container">
                            <SkipNextIcon/>
                        </TableCell>
                        <TableCell className="media-button-container">
                            <VolumeUpIcon/>
                        </TableCell>
                        <TableCell className="media-button-container">
                            <Button>
                                Request Control
                            </Button>
                        </TableCell>
                        <TableCell>
                            <div className="text-color-light">
                                Title of the Song of Video that is playing
                            </div>
                        </TableCell>
                        <TableCell className="media-button-container">
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