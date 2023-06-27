import React, { useEffect, useState } from 'react';
import { fetchUsersInRoom } from '../../../../features/roomService/RoomService';
import { hermes, getActiveUserList } from '../../../../features/socketService/HermesService';
import User from './User';
import './Users.css';

const UserList = ({ currentRoomkey, userId }) => {
    const [roomUsers, setRoomUsers] = useState([]);
    const [activeList, setActiveList] = useState([]);

    useEffect(() => {
        getActiveUserList(currentRoomkey);
        fetchAllRoomUsers(currentRoomkey);
       
        sortByActiveUser();
    }, []);

    const fetchAllRoomUsers = async (currentRoomkey) => {
        const userList = await fetchUsersInRoom(currentRoomkey);
        setRoomUsers(userList);
    };

    const sortByActiveUser = (userIds = activeList) => {
        roomUsers.forEach((user) => {
            user.active = userIds.includes(user.user_id);
        });
        roomUsers.sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
        return (
            <div className="user-list">
            {
                roomUsers.map((user, index) => (
                    <User
                    active={user.active}
                    key={index}
                    name={user.name}
                    />
                ))
            }
            </div>
        );
    };

    hermes.on(`active-users-${currentRoomkey}`, (data) => {
        setActiveList(data);
        sortByActiveUser(data);
    });
    
    return (
        sortByActiveUser()
    )
};

export default UserList;