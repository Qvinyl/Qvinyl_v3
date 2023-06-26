import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


const RefreshPageModal = ({refreshPageModalOpen}) => {

    const refreshPage = () => {
        window.location.reload(true);

    }

    return (
        <div>
            <Dialog
                open={refreshPageModalOpen}>
                <DialogTitle>
                   Disconnected, refresh the page to reconnect
                </DialogTitle>
                <DialogActions>
                    <Button variant="contained" onClick={refreshPage}>Refresh</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RefreshPageModal;