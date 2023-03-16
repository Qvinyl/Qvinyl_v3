import React from 'react';
import { Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const AddedUserBox = ({index, user, removeFromInvitationList}) => {
    return (
        <Paper elevation={3} onClick={() => {removeFromInvitationList(index)}}>
            <div className="box-container" key={index}>
                <div className="added-user-box">
                    {user.display_name} ({user.email}) 
                </div>  
                <ClearIcon className="remove-button"/>
            </div>
        </Paper>
    )
}

export default AddedUserBox