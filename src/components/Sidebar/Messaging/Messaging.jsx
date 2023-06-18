import {React} from 'react';
import CustomTabs from '../../Basics/Tabs/CustomTabs';
import Messages from './Messages';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../../../css/Messaging.css';

const Messaging = ({currentRoomkey, userId, displayName}) => {

    return (
        <CustomTabs
            tabs=
            {[
                {
                    name: "Messages",
                    component: 
                        <Messages
                            currentRoomkey={currentRoomkey}
                            userId={userId}
                            displayName={displayName} />
                },
                {
                    name: "Users",
                    component: <div style={{color: "white"}}>Hi</div>
                },
            ]}
        /> 
    )
}

export default Messaging;