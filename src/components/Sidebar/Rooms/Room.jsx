import React from 'react';
import '../../../css/Room.css';
const Room = ({roomId, name}) => {

    return (
       <div className="text-color-light">
            {roomId}
            <br/>
            {name}
       </div>
    )
}
export default Room;