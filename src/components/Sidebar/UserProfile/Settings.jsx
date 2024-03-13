import {React, useState} from 'react';
import CustomAccordion from '../../Basics/Accordian/CustomAccordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ActionIcon from '../../Basics/ActionIcons/ActionIcon';
// import SettingsIcon from '@mui/icons-material/Settings';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
// import Switch from '@mui/material/Switch';
// import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';
import Setting from './Setting';
import CustomTextField from '../../Basics/InputField/CustomTextField';
import { useNavigate } from 'react-router-dom';
import { disconnectSocket } from '../../../features/socketService/SyncService';
import { disconnectMessaging } from '../../../features/socketService/HermesService';
import { disconnectNotifications } from '../../../features/socketService/NotificationService';
import { setUserName, setLoggedIn } from '../../../store/actions/userActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { updateUserName } from '../../../features/userService/UserService';
import './Settings.css';

const logout = require('../../../features/userService/UserAdministration').logout;

const Settings = ({userId}) => {
    const [expanded, setExpanded] = useState(false);
    const [editing, setIsEditing] = useState(false);
    const [hasInputError, setHasInputError] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector((state) => state.userReducer.displayName);
    console.log(userName);
    const [name, setName] = useState(userName);
    
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

    const handleChange = (isExpanded) => {
        setExpanded(isExpanded);
    };
    
    const rename = async () => {
        if (name) {
            var results = await updateUserName(userId, name);
            if (results) {
                setName(name)
                dispatch(setUserName(name));
                setIsEditing(false)
            }
        }
        else {
            setHasInputError(true)
        }
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const setNewName = (event) => {
        const newValue = event.target.value;
        if (newValue) {
            setHasInputError(false)
        }
        setName(newValue);
    }

    const leaveRoom = () => {
        disconnectSocket();
        disconnectMessaging();
        disconnectNotifications();
    }

    return (
        <CustomAccordion className="text text-color-light component-tab" disableGutters expanded={expanded}>
            <AccordionSummary
                className="accordion"
                expandIcon={<ExpandMore className="add" onClick={() => handleChange(!expanded)}/>}>
                <div className="display-name-container">
                    <div className="display-name">
                    {
                        editing ?
        
                        <CustomTextField  
                            error={hasInputError}
                            type="text" 
                            value={name}
                            onChange={setNewName} 
                            fullWidth label="Edit Name" variant="standard" 
                            helperText={hasInputError ? "Cannot be blank" : ""}
                        />
                        :
                        <div>{userName}</div>

                    }   
                    </div>
                    &nbsp; 

                    { 
                        editing ?
                            
                            <ActionIcon
                                action={rename}
                                icon={ <CheckIcon className="icon"/> }/>
                        :
                            <ActionIcon
                                action={handleEdit}
                                icon={ <EditIcon className="icon"/>}/>
                    }

                </div>
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
        </CustomAccordion>
    )
}

export default Settings