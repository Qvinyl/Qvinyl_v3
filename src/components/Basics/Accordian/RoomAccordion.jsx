import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';

const RoomAccordion = styled(Accordion)({
    backgroundColor: "inherit",
    '& .MuiAccordionSummary-root': {
        color: '#ACACAC',
        '&.Mui-focusVisible': {
            backgroundColor: '#inherit',
        },
    },
    '& .MuiAccordionSummary-content': {
        backgroundColor: 'inherit',
        margin: '0px',
        width: "100%",
        display: "block",
    },
    '& .MuiAccordionDetails-root': {
        backgroundColor: 'inherit',
        color: '#ACACAC',
        // padding: "10px",
    },
})

export default RoomAccordion;