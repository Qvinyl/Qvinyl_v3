import React, { useState, useEffect } from 'react';
import { getUserUid } from '../../../features/userService/UserAuthentication';
import RoomList from './RoomList';
import AddRoom from './AddRoom';
import '../../../css/Room.css'

const Rooms = () => {
    const [uid, setUid] = useState("");

    useEffect(() => {
        getUid();
    }, []);

    const getUid = async () => {
        await getUserUid().then((user_id) => {
            setUid(user_id);
        });
    }

    return (
        <div className="content-container rooms">
            <AddRoom
                uid={uid}
            />
            <RoomList
                uid={uid}
            />
        </div>
    )
}

export default Rooms;