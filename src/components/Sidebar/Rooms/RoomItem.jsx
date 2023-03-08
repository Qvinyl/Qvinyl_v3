import React from 'react';
import { setUserCurrentRoomkey } from '../../../features/userService/UserAdministration';

const RoomItem = ({roomkey, roomName, setCurrentRoom}) => {

    const setCurrentRoomkey = () => {
        if  (setUserCurrentRoomkey(roomkey)) {
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
