import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { getUserUid } from '../../../features/userService/UserAuthentication';
import { getAdminRooms } from '../../../features/roomService/RoomService';
import RoomList from './RoomList';
import AddRoom from './AddRoom';
import '../../../css/Room.css'

const Rooms = () => {
    const [user_id, setUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        setLoading(true);
        getUid();
        if (user_id) {
            getRooms();
        }
    }, [user_id]);

    const getUid = async () => {
        await getUserUid().then((uid) => {
            setUserId(uid);
        });
        setLoading(false);
    }

    const getRooms = async () => {
        getAdminRooms(user_id, setRooms);
    }

    const appendNewRoom = (roomdata) => {
        if (Object.keys(roomdata).length !== 0) {
            setRooms([...rooms, roomdata]);
        }
    }

    return (
        <div className="content-container rooms">
            {
                loading ? 
                <LinearProgress/>
                :
                <div className="room-content-container">
                    <AddRoom
                        appendNewRoom={appendNewRoom}
                        user_id={user_id}
                    />
                    <RoomList
                        rooms={rooms}
                        user_id={user_id}
                    />
                </div>
            }
           
        </div>
    )
}

export default Rooms;