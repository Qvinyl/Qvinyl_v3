import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const AddButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 12,
  border: '1px #ACACAC solid',
  backgroundColor: 'transparent',
  color: 'white',
  minWidth: '2px',
  borderRadius: 50,
  lineHeight: 1.5,
  padding: 3,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
  },
  '&:focus': {
  },
});

export default AddButton;