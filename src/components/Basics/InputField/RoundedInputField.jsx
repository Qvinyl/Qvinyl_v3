import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const RoundedTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 50,
        '& fieldset': {
            borderColor: '#ACACAC',
        },
        '&:hover fieldset': {
            borderColor: '#ACACAC',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ACACAC',
        }
    }
    
});
  
export default RoundedTextField;