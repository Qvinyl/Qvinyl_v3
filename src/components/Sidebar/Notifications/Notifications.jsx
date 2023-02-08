import RoomAccordion from '../../Basics/Accordian/RoomAccordion';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMore from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import '../../../css/Sidebar.css';

import NotificationList from "./NotificaitonList";
const Notification = () => {

    return (
        <div className="content notifications">
             <Accordion className="text-color-light component-tab" disableGutters>
                <AccordionSummary 
                    expandIcon={<SettingsIcon className="add"/>}>
                    <Typography>
                        Joshua Cheung
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div>DarkMode</div>
                        <div>Logout</div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <NotificationList/>
        </div>
    )

}
export default Notification;