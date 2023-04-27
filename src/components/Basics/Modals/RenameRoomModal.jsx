import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import { renameVirtualRoom } from '../../../features/roomService/RoomAdministration';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import '../../../css/Modals.css';
const RenameRoomModal = ({updateRoomName, renameModalOpen, handleRenameModalClose, roomName, roomkey}) => {
    const [proposedName, setProposedName] = useState(roomName);
    const [hasInputError, setHasInputError] = useState(false)
    
    const renameRoom = async () => {
        if (proposedName) {
            var results = await renameVirtualRoom(roomkey, proposedName);
            if (results) {
                updateRoomName(results.updatedName);
            }
            handleRenameModalClose();
        }
        else {
            setHasInputError(true)
        }
    }

    const setNewName = (event) => {
        const newValue = event.target.value;
        if (newValue) {
            setHasInputError(false)
        }
        setProposedName(newValue);
    }

    return (
        <div>
            <Dialog
                open={renameModalOpen}
                onClose={handleRenameModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Renaming Room: <b>{roomName}</b>?
                    <br/>
                    <br/>
                    <FormControl fullWidth>
                        <TextField
                            error={hasInputError}
                            size="small"
                            value={proposedName}
                            label= "New room name..."
                            onChange={setNewName} 
                            multiline 
                            maxRows={1} 
                            helperText={hasInputError ? "Cannot be blank" : ""}
                        />
                    </FormControl>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={renameRoom}>Rename</Button>
                    <Button className="delete-button" onClick={handleRenameModalClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RenameRoomModal;