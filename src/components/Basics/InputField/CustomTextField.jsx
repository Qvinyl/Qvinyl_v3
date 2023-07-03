import TextField from "@mui/material/TextField";
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)({
    '& .MuiFormControl-root': {
        margin: "auto"
    },
    '& .MuiFormControl-root': {
        margin: "auto"
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: '#ACACAC',
        color: "#ACACAC"
    },
    '& .MuiInputLabel-root': {
        color: "#ACACAC",
    },
    '& .MuiInput-input': {
        color: "#ACACAC"
    },
    '& .MuiInput-root': {
        color: "#1976d2",
        marginTop: 5
    },
    '& .MuiFormLabel-root': {
        top: -10,
        '&.Mui-focused': {
            color: '#1976d2',
            top: -3,
        },
    },
    '& .MuiInputLabel-shrink' : {
        top: -3,
    },
})
export default CustomTextField;