import React from 'react';
import QueuedButton from '../../Basics/Button/QueuedButton';
import { addToPlaylist } from '../../../features/queueService/Queuing/QueueServices';
import '../../../css/Queue.css';

const QueueItem = ({thumbnail, title, queuedBy, wasPlayed, url, currentRoomkey, displayName, queue}) => {
    var urls = queue.map((item) => item.url);

    const addToRoomPlaylist = async () => {
        const element = {
            url: url,
            title: title, 
            thumbnail: thumbnail,
            queuedBy: displayName
        }

        await addToPlaylist(currentRoomkey, element);
    }

    const isQueued = (url) => {
        return urls.includes(url)
    }
    

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
                {
                    queuedBy ?
                        <div className="queued-by-text text-color-light">
                            <br/>
                            Queued By {queuedBy}
                        </div> 
                    :
                    <div>
                    { 
                        isQueued(url) ? 
                            <QueuedButton className="queued" disabled size="small">Queued</QueuedButton>
                        :
                            wasPlayed ? 
                            <QueuedButton onClick={() => {addToRoomPlaylist()}}>Requeue +</QueuedButton>
                            : 
                            <QueuedButton onClick={() => {addToRoomPlaylist()}}>Queue +</QueuedButton>
                    }
                    </div>
                }
            </div>
        </div>
    )
}
export default QueueItem;