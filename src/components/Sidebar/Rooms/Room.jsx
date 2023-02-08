import React from 'react';
import AdminRoomItem from './AdminRoomItem';
import RoomItem from './RoomItem';

import '../../../css/Room.css';

const Room = ({roomId, roomName, isAdmin}) => {

    return (
        <div>
            {
                isAdmin ? 
                <AdminRoomItem 
                    roomId={roomId}
                    roomName={roomName}/>
                :
                <RoomItem
                    roomId={roomId}
                    roomName={roomName}/>
            }
        </div>  
        
       
    )
}
export default Room;