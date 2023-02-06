import React from 'react';
import '../../../css/Queue.css';

const QueueItem = ({thumbnail, title, queuedBy}) => {

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
                <div className="queued-text">Queued By {queuedBy}</div>
            </div>
        </div>
    )
}
export default QueueItem;