import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
    '& .MuiInput-underline:before': {
        borderBottomColor: '#ACACAC',
    },
    '& .MuiInputLabel-root': {
        color: "#ACACAC",
    }
})
export default CustomTextField;