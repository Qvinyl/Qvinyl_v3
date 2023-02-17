import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
const RoundedTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        overflow: 'hidden',
        borderRadius: 15,
        color: '#ACACAC',
        '& fieldset': {
            borderColor: '#ACACAC',
        },
        '&:hover fieldset': {
            borderColor: '#ACACAC',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ACACAC',
        },
        margin: "10px",
        paddingRight: '16px',
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '16px',
    },
    '& .MuiInputLabel-root' : {
        color: '#ACACAC',
        top: "0px",
        left: "10px",
        borderWidth: 2,
        '&.Mui-focused': {
            color: '#1976d2',
            top: "8px",
        },
    },
    '& .MuiInputLabel-shrink' : {
        top: "8px",
    },
    width: "100%",
});
  
export default RoundedTextField;