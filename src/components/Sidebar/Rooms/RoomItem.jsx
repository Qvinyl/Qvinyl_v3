import React from 'react';
import { setUserCurrentRoomkey } from '../../../features/userService/UserAdministration';

const RoomItem = ({roomkey, roomName, setCurrentRoom, userId, selected}) => {

    const setCurrentRoomkey = async () => {
        var results = await setUserCurrentRoomkey(userId, roomkey)
        if  (results) {
            setCurrentRoom(roomkey);
        }
    }
    
    return (
        <div className="text-color-light room-item" onClick={() => {setCurrentRoomkey()}}>
            <div className="room-item-text">
                { selected ?
                    <b>{roomName}</b>
                    :
                    <div> {roomName} </div>
                } 
            </div>
        </div>
    )
}

export default RoomItem;
