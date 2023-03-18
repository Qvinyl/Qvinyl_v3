import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { getUserUid, getUserCurrentRoomkey } from '../../../features/userService/UserAdministration';
import { fetchUserRooms } from '../../../features/roomService/RoomService';
import RoomList from './RoomList';
import AddRoom from './AddRoom';
import '../../../css/Room.css'

const Rooms = ({joinRoom, displayName}) => {
    const [user_id, setUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [currentRoomkey, setCurrentRoomkey] = useState("")

    useEffect(() => {
        setLoading(true);
        getUid();
        if (user_id) {
            fetchAndSortRooms();
            getCurrentRoom();
        }
    }, [user_id, currentRoomkey]);

    const getUid = async () => {
        await getUserUid().then((uid) => {
            setUserId(uid);
        });
        setLoading(false);
    }

    const appendNewRoom = (roomdata) => {
        if (Object.keys(roomdata).length !== 0) {
            setRooms([roomdata, ...rooms]);
        }
    }

    const removeRoom = (roomkey) => {
        var roomlist = [...rooms];
        var index = roomlist.findIndex((room => room.roomkey === roomkey));
        if (index !== -1) {
            roomlist.splice(index, 1);
            setRooms(roomlist);
        }
    }

    const setCurrentRoom = (roomkey) => {
        if (roomkey !== currentRoomkey) {
            joinRoom(roomkey);
            setCurrentRoomkey(roomkey)
        }
    }

    const getCurrentRoom = () => {
        var roomkey = getUserCurrentRoomkey();
        setCurrentRoomkey(roomkey);
    }

    const fetchAndSortRooms = async () => {
        var rooms = await fetchUserRooms(user_id);
        rooms.sort((a, b) => {
            if (a.admin === user_id) {
                return -1;
            }
            else if ( b.admin === user_id) {
                return 1;
            }
            return 0;
        })
        setRooms(rooms)
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
                        displayName={displayName}
                        setCurrentRoom={setCurrentRoom}
                        currentRoomkey={currentRoomkey}
                        removeRoom={removeRoom}
                        rooms={rooms}
                        user_id={user_id}
                    />
                </div>
            }
           
        </div>
    )
}

export default Rooms;