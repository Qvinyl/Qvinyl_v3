import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { grantMediaControl } from '../../../features/socketService/SyncService';
import '../../../css/Modals.css';

const RequestControlModal = ({controlModalOpen, handleControlModalClose, requester, currentRoomkey}) => {
    const grantUserAccess = () => {
        grantMediaControl(currentRoomkey)
        handleControlModalClose();
    }

    return (
        <div>
            <Dialog
                open={controlModalOpen}
                onClose={handleControlModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    <b>{requester.displayName}</b> would like to control the room media.
                </DialogTitle>
                <DialogActions>
                    <Button onClick={grantUserAccess}>Accept</Button>
                    <Button className="delete-button" onClick={handleControlModalClose}>Deny</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RequestControlModal;