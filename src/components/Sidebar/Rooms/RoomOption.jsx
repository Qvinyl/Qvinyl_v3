import React from 'react';
import Typography from '@mui/material/Typography';
import '../../../css/Room.css';

const RoomOption = ({option, icon, action}) => {
    return (
        <Typography className="option-container" component={'span'}>
            <div className="room-option-container" onClick={() => action()}>
                <div className="option-text">
                    {option}
                </div>
                <div className="icon">
                    {icon}
                </div>
            </div>
        </Typography>
    )
    
}
export default RoomOption;