import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Switch from '@mui/material/Switch';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';
import Setting from './Setting';

const Settings = () => {
    return (
        <Accordion className="text-color-light component-tab" disableGutters>
            <AccordionSummary 
                expandIcon={<SettingsIcon className="add"/>}>
                <Typography>
                    Joshua Cheung
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Setting 
                    icon={<DarkModeIcon/>}
                    input={"Darkmode"}
                />
                <Setting 
                    icon={<LogoutIcon/>}
                    input={"Logout"}
                />
            </AccordionDetails>
        </Accordion>
    )
}

export default Settings