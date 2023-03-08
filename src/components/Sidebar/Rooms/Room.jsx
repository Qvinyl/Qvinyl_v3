import React from 'react';
import AdminRoomItem from './AdminRoomItem';
import RoomItem from './RoomItem';

import '../../../css/Room.css';

const Room = ({roomkey, roomName, isAdmin, removeRoom}) => {

    return (
        <div>
            {
                isAdmin ? 
                <AdminRoomItem 
                    removeRoom={removeRoom}
                    roomkey={roomkey}
                    roomName={roomName}/>
                :
                <RoomItem
                    roomkey={roomkey}
                    roomName={roomName}/>
            }
        </div>  
        
       
    )
}
export default Room;