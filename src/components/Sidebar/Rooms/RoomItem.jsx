import React from 'react';

const RoomItem = ({roomId, roomName}) => {
    return (
        <div className="text-color-light room-item">
            {roomName}
        </div>
    )
}

export default RoomItem;