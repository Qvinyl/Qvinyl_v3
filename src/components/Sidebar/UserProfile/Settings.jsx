import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// import Switch from '@mui/material/Switch';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';
import Setting from './Setting';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../features/userService/UserAuthentication';
const logout = require('../../../features/userService/UserAuthentication').logout;

const Settings = () => {
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = async () => {
        await getUserInfo()
        .then((info) => {
            console.log(info);
            setDisplayName(info.display_name);
        });
    }

    const loggingOut = () => {
        
        if (logout()) {
            navigate('/login');
        }   
        else {
            console.log("error signing out");
        }
    }

    return (
        <Accordion className="text-color-light component-tab" disableGutters>
            <AccordionSummary 
                expandIcon={<SettingsIcon className="add"/>}>
                <Typography component={'span'}>
                    {displayName}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Setting 
                    icon={<DarkModeIcon/>}
                    input={"Darkmode"}
                />
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