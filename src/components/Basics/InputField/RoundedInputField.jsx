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
        paddingRight: '10px',
        paddingTop: '10px',
        paddingBottom: '10px',
        PaddingLeft: '16px',
    },
    '& .MuiInputLabel-root' : {
        color: '#ACACAC',
        top: "8px",
        left: "10px",
        borderWidth: 2,
        '&.Mui-focused': {
            color: '#1976d2',
        },
    }
});
  
export default RoundedTextField;