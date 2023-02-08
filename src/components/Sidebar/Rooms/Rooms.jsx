import React from 'react';
import RoomList from './RoomList';
import AddRoom from './AddRoom';


import '../../../css/Room.css'

const Rooms = () => {
    return (
        <div className="content-container rooms">
            <AddRoom/>
            <RoomList/>
        </div>
    )
}

export default Rooms;