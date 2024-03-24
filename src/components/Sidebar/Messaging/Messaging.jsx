import {React} from 'react';
import CustomTabs from '../../Basics/Tabs/CustomTabs';
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