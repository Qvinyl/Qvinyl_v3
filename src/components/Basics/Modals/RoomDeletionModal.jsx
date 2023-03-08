import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { deleteVirtualRoom } from '../../../features/roomService/RoomAdministration';
import '../../../css/Modals.css';
const RoomDeletionModal = ({deletionModalOpen, handleDeleteModalclose, roomName, roomkey, removeRoom}) => {

    const deleteRoom = () => {
        deleteVirtualRoom(roomkey)
        .then(wasDeleted => {
            if (wasDeleted) {
                removeRoom(roomkey);
            }
        });
        handleDeleteModalclose();
    }

    return (
        <div>
            <Dialog
                open={deletionModalOpen}
                onClose={handleDeleteModalclose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure you want to delete: <b>{roomName}</b> ?
                </DialogTitle>
                <DialogActions>
                    <Button className="delete-button" onClick={deleteRoom}>Delete</Button>
                    <Button onClick={handleDeleteModalclose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RoomDeletionModal;