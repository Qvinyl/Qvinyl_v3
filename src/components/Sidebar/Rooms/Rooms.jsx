import React from 'react';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import RoomList from './RoomList';
import AddButton from '../../Basics/Button/AddButton';
import AddIcon from '@mui/icons-material/Add';

import '../../../css/Room.css'

const Rooms = () => {
    return (
        <div className="content-container rooms" id="queue-component">
            <div className="room-navigation">
                <div className="room-search-container">
                    <RoundedInputField label="Search Your Rooms..." multiline maxRows={2}/>  
                </div>
                <div className="add-room-container">
                    <AddButton> <AddIcon className="add"/> </AddButton>
                </div>
            </div>
            <RoomList/>
        </div>
    )
}

export default Rooms;