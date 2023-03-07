import React from 'react';

const RoomItem = ({roomkey, roomName}) => {
    return (
        <div className="text-color-light room-item">
            {roomName}
        </div>
    )
}

export default RoomItem;