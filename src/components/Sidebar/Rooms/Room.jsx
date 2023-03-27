import React from 'react';
import AdminRoomItem from './AdminRoomItem';
import RoomItem from './RoomItem';
import '../../../css/Room.css';

const Room = ({displayName, roomId, roomkey, roomName, isAdmin, removeRoom, setCurrentRoom, userId, selected}) => {
    return (
        <div>
            {
                isAdmin ? 
                <AdminRoomItem 
                    selected={selected}
                    userId={userId}
                    displayName={displayName}
                    roomId={roomId}
                    setCurrentRoom={setCurrentRoom}
                    removeRoom={removeRoom}
                    roomkey={roomkey}
                    roomName={roomName}/>
                :
                <RoomItem
                    selected={selected}
                    userId={userId}
                    setCurrentRoom={setCurrentRoom}
                    roomkey={roomkey}
                    roomName={roomName}/>
            }
        </div>  
        
       
    )
}
export default Room;