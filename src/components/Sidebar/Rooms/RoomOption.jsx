import React from 'react';
import Tooltip from '@mui/material/Tooltip';

import '../../../css/Room.css';

const RoomOption = ({option, icon, action}) => {
    return (
        <Tooltip title={option}>
            <div className="room-option-container" onClick={() => action()}>
                {icon}
            </div>
        </Tooltip>
        
    )
    
}
export default RoomOption;