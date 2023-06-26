import {React, useEffect, useState} from 'react';
import { hermes, getUserList } from '../../../../features/socketService/HermesService';
import User from './User';
import './Users.css'

const UserList = ({currentRoomkey, userId}) => { 
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getUserList(currentRoomkey);
    }, [])

    hermes.on(`users-${currentRoomkey}`, (data) => {
        setUserList(data);
    });

    return (
        <div className="user-list">
            {
                userList.map((user, index) => (
                    <User
                        key={index}
                        userId={userId}
                        name={user.displayName}
                        id={user.userId}
                    />
                ))
            }
        </div>
    )
}
export default UserList;