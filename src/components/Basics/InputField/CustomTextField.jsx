import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
    '& .MuiInput-underline:before': {
        borderBottomColor: '#ACACAC',
        color: "#ACACAC"
    },
    '& .MuiInputLabel-root': {
        color: "#ACACAC",
    },
    '& .MuiInput-input': {
        color: "#ACACAC"
    }
})
export default CustomTextField;