import React from 'react';
import AdminRoomItem from './AdminRoomItem';
import RoomItem from './RoomItem';
import '../../../css/Room.css';

const Room = ({displayName, roomId, roomkey, roomName, isAdmin, removeRoom, setCurrentRoom}) => {
    return (
        <div>
            {
                isAdmin ? 
                <AdminRoomItem 
                    displayName={displayName}
                    roomId={roomId}
                    setCurrentRoom={setCurrentRoom}
                    removeRoom={removeRoom}
                    roomkey={roomkey}
                    roomName={roomName}/>
                :
                <RoomItem
                    setCurrentRoom={setCurrentRoom}
                    roomkey={roomkey}
                    roomName={roomName}/>
            }
        </div>  
        
       
    )
}
export default Room;