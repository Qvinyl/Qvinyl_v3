import React from 'react';
import { setUserCurrentRoomkey } from '../../../features/userService/UserAdministration';

const RoomItem = ({roomkey, roomName, setCurrentRoom, userId}) => {

    const setCurrentRoomkey = async () => {
        var results = await setUserCurrentRoomkey(userId, roomkey)
        if  (results) {
            setCurrentRoom(roomkey);
        }
    }
    
    return (
        <div className="text-color-light room-item" onClick={() => {setCurrentRoomkey()}}>
            {roomName}
        </div>
    )
}

export default RoomItem;
