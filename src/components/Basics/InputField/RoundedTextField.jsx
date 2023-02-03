import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';

const RoundedTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        padding: 10,
        borderRadius: 50,
        '& fieldset': {
            borderColor: '#ACACAC',
        },
        '&:hover fieldset': {
            borderColor: '#ACACAC',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ACACAC',
        },
      
    }
    
});
  
export default function RoundedInputField() {
    return (
        <RoundedTextField margin="normal"/>
    )
}