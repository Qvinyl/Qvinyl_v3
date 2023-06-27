import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';

const User = ({name, active}) => { 
    return (
        <div className="user-container">
            <div className="user">{name}</div>
            {active && <div><CircleIcon className="active-badge"/></div>}
            {/* <div className="role">Owner</div> */}
        </div>
    )
}
export default User;