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
    }, [currentRoomkey]);

    const fetchAllRoomUsers = async (currentRoomkey) => {
        try {
            const userList = await fetchUsersInRoom(currentRoomkey);
            setRoomUsers(userList);
        }
        catch (e) {
            console.log(e);
        }
       
    };

    const sortByActiveUser = () => {
        var sortedUsers = []
        try {
            sortedUsers = roomUsers.map((user) => ({
                ...user,
                active: activeList.includes(user.user_id),
            })).sort((a, b) => (a.active === b.active ? 0 : a.active ? -1 : 1));
        }
        catch(e) {
            sortedUsers = []
        }
    
        return (
            <div className="user-list">
                {
                    sortedUsers.map((user, index) => (
                        <User active={user.active} key={index} name={user.name} />
                ))}
            </div>
        );
    };

    // useEffect(() => {
    //         hermes.off(`active-users-${currentRoomkey}`).on(`active-users-${currentRoomkey}`, (data) => {
    //         setActiveList(data);
    //     });
    // }, [currentRoomkey]);

    return sortByActiveUser();
};

export default UserList;