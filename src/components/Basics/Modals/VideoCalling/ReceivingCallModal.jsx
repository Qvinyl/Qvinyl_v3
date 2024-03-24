import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ReceivingRoomModal = ({receivingCallModalOpen, handleReceivingCallModalClose, handleAcceptCall, caller}) => {
    return (
        <div>
            <Dialog
                open={receivingCallModalOpen}
                onClose={handleReceivingCallModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">
                    Incoming Video Call from {caller}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleAcceptCall}>Join</Button>
                    <Button className="delete-button" onClick={handleReceivingCallModalClose}>Decline</Button>
                </DialogActions>
            </Dialog>    
        </div>
    )
}

export default ReceivingRoomModal;