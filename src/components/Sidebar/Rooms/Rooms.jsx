import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { fetchUserRooms } from '../../../features/roomService/RoomService';
import { useDispatch } from 'react-redux';
import RoomList from './RoomList';
import AddRoom from './AddRoom';
import '../../../css/Room.css'

const Rooms = ({joinRoom, displayName, userId, currentRoomkey}) => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        if (userId) {
            fetchAndSortRooms();
            setLoading(false);
        }
    }, [userId, currentRoomkey]);


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
        }
    }

    const fetchAndSortRooms = async () => {
        var rooms = await fetchUserRooms(userId);
        rooms.sort((a, b) => {
            if (a.admin === userId) {
                return -1;
            }
            else if ( b.admin === userId) {
                return 1;
            }
            return 0;
        })
        setRooms(rooms)
    }

    const searchRooms = (roomFilter) => {
        if (!roomFilter) {
            setFilteredList(rooms);
        } 
        var newList = rooms.filter(room => {
            const lc = (room.room_name).toLowerCase();
            return lc.includes(roomFilter.toLowerCase())
        });
        setFilteredList(newList);
    } 

    return (
        <div className="content-container rooms">
            {
                loading ? 
                <LinearProgress/>
                :
                <div className="room-content-container">
                    <AddRoom
                        searchRooms={searchRooms}
                        appendNewRoom={appendNewRoom}
                        userId={userId}
                    />
                    <RoomList
                        displayName={displayName}
                        setCurrentRoom={setCurrentRoom}
                        currentRoomkey={currentRoomkey}
                        removeRoom={removeRoom}
                        rooms={filteredList.length > 0 ? filteredList : rooms}
                        userId={userId}
                    />
                </div>
            }
        </div>
    )
}

export default Rooms;