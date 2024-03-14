import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const CallingRoomModal = ({callingModalOpen, handleCallingModalClose, handleCancelCall}) => {
    return (
        <div>
            <Dialog
                open={callingModalOpen}
                onClose={handleCallingModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">
                    Calling Room... 
                </DialogTitle>

                <DialogActions>
                    <Button className="delete-button" onClick={handleCancelCall}>Cancel</Button>
                </DialogActions>
            </Dialog>    
        </div>
    )
}

export default CallingRoomModal;