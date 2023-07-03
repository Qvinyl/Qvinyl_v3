import React from 'react';
import Tooltip from '@mui/material/Tooltip';

import './ActionIcon.css';

const ActionIcon = ({option, icon, action}) => {
    return (
        <Tooltip title={option}>
            <div className="icon-container" onClick={() => action()}>
                <div className="icon">{icon}</div>
            </div>
        </Tooltip>
        
    )
    
}
export default ActionIcon;