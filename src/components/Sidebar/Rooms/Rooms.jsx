import React from 'react';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import '../../../css/Room.css'

const Rooms = () => {
    return (
        <div className="ccontent-container rooms" id="queue-component">
            <div className="input-field send" >
                <RoundedInputField label="Search Rooms..." multiline maxRows={4} />
            </div>
        </div>
    )
}

export default Rooms;