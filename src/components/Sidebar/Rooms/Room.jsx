import React from 'react';
import AdminRoomItem from './AdminRoomItem';
import RoomItem from './RoomItem';
import '../../../css/Room.css';

const Room = ({roomkey, roomName, isAdmin, removeRoom, setCurrentRoom}) => {
    return (
        <div>
            {
                isAdmin ? 
                <AdminRoomItem 
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