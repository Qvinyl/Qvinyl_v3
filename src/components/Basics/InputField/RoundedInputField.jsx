import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
const RoundedTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        overflow: 'hidden',
        borderRadius: 25,
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
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '16px',
    },
    '& .MuiInputLabel-root' : {
        color: '#ACACAC',
        top: "5px",
        left: "10px",
        borderWidth: 2,
        '&.Mui-focused': {
            color: '#1976d2',
            top: "10px",
        },
    },
    marginTop: "auto"
});
  
export default RoundedTextField;