import React from 'react';
import '../../../css/Queue.css';

const QueueItem = ({thumbnail, title, queuedBy}) => {

    return (
        <div className="item">
            <div>
                <img src={thumbnail}/>
            </div>
            <div>{title}</div>
            <div>{queuedBy}</div>
        </div>
    )
}
export default QueueItem;