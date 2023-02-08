import React from 'react';

const RoomItem = ({roomId, name}) => {
    return (
        <div className="text-color-light room-item">
            {name}
        </div>
    )
}

export default RoomItem;