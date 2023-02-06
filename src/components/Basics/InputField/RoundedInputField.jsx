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
        padding: '10px 10px 10px 16px',
    },
    '& .MuiInputLabel-root' : {
        color: '#ACACAC',
        top: "7px",
        left: "12px",
        borderWidth: 2,
        '&.Mui-focused': {
            color: '#ACACAC',
        },
    }
});
  
export default RoundedTextField;