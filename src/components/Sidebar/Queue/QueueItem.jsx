import React from 'react';
import Button from '@mui/material/Button';
import RequeuedButton from '../../Basics/Button/RequeuedButton';
import '../../../css/Queue.css';

const QueueItem = ({thumbnail, title, queuedBy, wasPlayed}) => {

    return (
        <div className="item">
            <div className="thumbnail-container">
                <img src={thumbnail} className="thumbnail"/>
            </div>
            <div className="text-container">
                <div>
                    <b>
                        {title}
                    </b>
                </div>
                <br/>
                { 
                    wasPlayed ? 
                    <RequeuedButton>Requeue +</RequeuedButton>
                    // <Button size="small" variant="contained">Requeue +</Button>
                    : 
                    <div className="queued-text">Queued By {queuedBy}</div> 
                }
            </div>
        </div>
    )
}
export default QueueItem;