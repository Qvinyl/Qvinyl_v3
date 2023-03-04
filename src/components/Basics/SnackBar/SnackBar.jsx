import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const SnackBar = ({open, message, isSuccessful, handleSnackBarClose}) => {
    const handleClose = () => {
        handleSnackBarClose(false);
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}>
            <MuiAlert onClose={handleClose} severity={isSuccessful ? "success" : "error"} sx={{ width: '100%' }}>
                {message}
            </MuiAlert>
        </Snackbar>
    )
}
export default SnackBar;

