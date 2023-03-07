import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { deleteVirtualRoom } from '../../../features/roomService/RoomAdministration';



const RoomDeletionModal = ({deletionModalOpen, handleDeleteModalclose, roomName, roomkey}) => {

    const deleteRoom = () => {
        deleteVirtualRoom(roomkey);
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
                    <Button onClick={deleteRoom}>Confirm</Button>
                    <Button onClick={handleDeleteModalclose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RoomDeletionModal;