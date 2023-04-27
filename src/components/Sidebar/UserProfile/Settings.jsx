import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMore from '@mui/icons-material/ExpandMore';
// import SettingsIcon from '@mui/icons-material/Settings';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import Switch from '@mui/material/Switch';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';
import Setting from './Setting';
import { useNavigate } from 'react-router-dom';
import { disconnectSocket } from '../../../features/socketService/SyncService';
import { disconnectMessaging } from '../../../features/socketService/HermesService';
import { disconnectNotifications } from '../../../features/socketService/NotificationService';
import { setLoggedIn } from '../../../store/actions/userActions';
import { useDispatch } from 'react-redux';
const logout = require('../../../features/userService/UserAdministration').logout;

const Settings = ({displayName}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggingOut = () => {
        if (logout()) {
            navigate('/login');
            dispatch(setLoggedIn(false));
            leaveRoom();
        }   
        else {
            console.log("Error signing out");
        }
    }

    const leaveRoom = () => {
        disconnectSocket();
        disconnectMessaging();
        disconnectNotifications();
    }

    return (
        <Accordion className="text text-color-light component-tab" disableGutters>
            <AccordionSummary 
                expandIcon={<ExpandMore className="add"/>}>
                <Typography component={'span'}>
                    {displayName}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {/* <Setting 
                    icon={<DarkModeIcon/>}
                    input={"Darkmode"}
                /> */}
                <Setting 
                    action={loggingOut}
                    icon={<LogoutIcon/>}
                    input={"Logout"}
                />
            </AccordionDetails>
        </Accordion>
    )
}

export default Settings