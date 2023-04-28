import React, {useState, useRef} from 'react';
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
import CustomSlider from '../Basics/Slider/CustomSlider'; 
import LinearProgress from '@mui/material/LinearProgress';
import screenfull from 'screenfull';
import { socket, voteToSkip, requestingMediaControl } from '../../features/socketService/SyncService';

const MediaControls = ({setVolumeLevel, setPlaybackState, handleOnSeekChange, volume, playback, setMuteState, muted, progress, playerRef, title, currentRoomkey, user, hasControl}) => {
    const [isMuted, setMute] = useState(muted)
    const [fullScreen, setFullScreen] = useState(false)
    const [votedToSkip, setVoteToSkip] = useState(false);
    const inputRef = useRef(null);

    const handleOnPlayback = (playback) => {
        if (hasControl) {
            setPlaybackState(playback)
        }
    }

    const handleOnFullScreen = (isFullScreen) => {
        if(isFullScreen) {
            screenfull.request(playerRef)
        }
        else {
            screenfull.exit();
        }
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

    const setProgress = (event) => {
        event.preventDefault();
        var seekProgress = event.target.value;
        handleOnSeekChange(seekProgress);
    }

    const VotingToSkip = () => {
        voteToSkip(currentRoomkey);
        setVoteToSkip(true)
    }

    const onRequestControlClick = () => {
        var requestingUser = {
            userId: user.user_id,
            displayName: user.display_name
        }
        requestingMediaControl(currentRoomkey, requestingUser);
    }

    socket.off(`skipping-${currentRoomkey}`).on(`skipping-${currentRoomkey}`, (data) =>  {
        if (data.skipping) {
            setVoteToSkip(false);
        }
    });

    return (
        <div className="media-controls">
            <div className="media-screen-pause-play" onClick={() => { 
                handleOnPlayback(!playback)}
             } ref={inputRef} />
            <div className="progress-bar">
                {
                    hasControl ? 
                    <CustomSlider className="progress-slider" onChange={setProgress} size="small" defaultValue={0} value={progress} aria-label="Small"/>
                    :
                    <LinearProgress variant="determinate" defaultValue={0} value={progress}/>
                }

            </div>
            <Table className="media-table">
                <TableBody>
                    <TableRow>
                        <TableCell className="media-button-container media-container">
                            <div>
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
                            </div>
                           
                        </TableCell>
                        <TableCell className="media-button-container media-container">
                            <div>
                                {
                                    votedToSkip ? 
                                    <SkipNextIcon className="player-icon voted"/>
                                    :
                                    <SkipNextIcon className="player-icon" onClick={() => VotingToSkip()}/>
                                }
                                
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
                                
                                <CustomSlider
                                    defaultValue={100}
                                    className="slider"
                                    size="small"
                                    onChange={handleVolumeOnChange}
                                    value={volumeValue()}
                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                />
                            </div>
                            
                        </TableCell>
                        <TableCell className="media-button-extended-container media-container">
                        {
                            hasControl ? 
                            <Button disabled className="in-control-button" variant="contained">
                                In Ctrl
                            </Button>
                            :
                            <Button 
                                className="request-control-button" 
                                variant="contained"
                                onClick={() => {onRequestControlClick()}}>
                                Req Ctrl
                            </Button>
                        }
                        </TableCell>
                        <TableCell className="media-container">
                            <div className="text title-color">
                                <div className="title-overflow"> 
                                    {title}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="media-button-container media-container">
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