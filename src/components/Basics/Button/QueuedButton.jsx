import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const QueuedButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 12,
  padding: '6px 12px',
  border: '1px #5B5B5B solid',
  backgroundColor: '#5B5B5B',
  color: 'white',
  lineHeight: 1.5,
  width: '100%',
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

export default QueuedButton;