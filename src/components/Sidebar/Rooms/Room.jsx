import React from 'react';
import AdminRoomItem from './AdminRoomItem';
import RoomItem from './RoomItem';

import '../../../css/Room.css';

const Room = ({roomId, name, isAdmin}) => {

    return (
        <div>
            {
                isAdmin ? 
                <AdminRoomItem 
                    roomId={roomId}
                    name={name}/>
                :
                <RoomItem
                    roomId={roomId}
                    name={name}/>
            }
        </div>  
        
       
    )
}
export default Room;