
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';

const CustomAccordion = styled(Accordion)({
    '& .MuiAccordion-root': {
        width: "100%",
        backgroundColor: '#2b2b2b',
    },
    '& .MuiAccordionSummary-root': {
        backgroundColor: '#2b2b2b',
        '&.Mui-focusVisible': {
            backgroundColor: '#2b2b2b',
        },
    },
    '& .MuiAccordionSummary-content': {
        backgroundColor: '#2b2b2b',
        margin: '0px',
        width: "100%",
        display: "block",
    },
    '& .MuiAccordionDetails-root': {
        backgroundColor: '#2b2b2b',
        color: '#ACACAC',
        padding: "16px",
    },
})

export default CustomAccordion;