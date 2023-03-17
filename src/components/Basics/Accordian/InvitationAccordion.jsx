
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';

const InvitationAccordion = styled(Accordion)({
    boxShadow: "none",
    '& .MuiAccordionSummary-root': {
        padding: "0px",
        backgroundColor: 'inherit',
    },
    
})

export default InvitationAccordion;