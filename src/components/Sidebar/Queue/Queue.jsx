import React from 'react';
import QueueList from './QueueList';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import '../../../css/Queue.css'
const Queue = () => {
    return (
        <div className="content-container queue" id="queue-component">
            <QueueList className="items"/>
            <div className="input-field send" >
                <RoundedInputField label="Search/Paste from Youtube" multiline maxRows={4} />
            </div>
        </div>
    )
}

export default Queue;