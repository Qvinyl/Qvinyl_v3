import React from 'react';
import RequeuedButton from '../../Basics/Button/RequeuedButton';
import '../../../css/Queue.css';

const QueueItem = ({thumbnail, title, queuedBy, wasPlayed}) => {

    return (
        <div className="item">
            <div className="thumbnail-container">
                <img src={thumbnail} alt="thumbnail" className="thumbnail"/>
            </div>
            <div className="text-container">
                <div className="title-text text-color-light">
                    <b>
                        {title}
                    </b>
                </div>
                <br/>
                { 
                    wasPlayed ? 
                    <RequeuedButton>Requeue +</RequeuedButton>
                    : 
                    <div className="queued-by-text text-color-light">Queued By {queuedBy}</div> 
                }
            </div>
        </div>
    )
}
export default QueueItem;