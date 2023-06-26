import {React} from 'react';
import AddButton from '../../Basics/Button/AddButton';
import CustomTabs from '../../Basics/Tabs/CustomTabs';
import { disconnectSocket } from '../../../features/socketService/SyncService';
import { disconnectMessaging } from '../../../features/socketService/HermesService';
import { disconnectNotifications } from '../../../features/socketService/NotificationService';
import Messages from './Messages';
import UserList from './Users/UserList';
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
                    component: 
                        <UserList
                            userId={userId}
                            currentRoomkey={currentRoomkey}
                        />
                },
            ]}
        /> 
    )
}

export default Messaging;