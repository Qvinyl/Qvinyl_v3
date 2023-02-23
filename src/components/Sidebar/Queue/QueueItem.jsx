import React from 'react';
import QueuedButton from '../../Basics/Button/QueuedButton';
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
                    queuedBy ?
                        <div className="queued-by-text text-color-light">Queued By {queuedBy}</div> 
                    :
                    <div>
                    { 
                        wasPlayed ? 
                        <QueuedButton>Requeue +</QueuedButton>
                        : 
                        <QueuedButton>Queue +</QueuedButton>
                    }
                    </div>
                }
            </div>
        </div>
    )
}
export default QueueItem;