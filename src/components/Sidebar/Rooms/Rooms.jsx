import React from 'react';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import '../../../css/Room.css'

const Rooms = () => {
    return (
        <div className="content rooms" id="room-component">
            <div className="input-field send" >
                <RoundedInputField label="Search Rooms..." />
            </div>
        </div>
    )
}

export default Rooms;