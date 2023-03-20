import React, {useState} from 'react';
import QueuedButton from '../../Basics/Button/QueuedButton';
import { addToPlaylist } from '../../../features/queueService/Queuing/QueueServices';
import '../../../css/Queue.css';

const QueueItem = ({thumbnail, title, queuedBy, wasPlayed, url, currentRoomkey, displayName, queue}) => {
    var urls = queue.map((item) => item.url);
    const [queued, setQueued] = useState(urls.includes(url))


    const addToRoomPlaylist = async () => {
        const element = {
            url: url,
            title: title, 
            thumbnail: thumbnail,
            queuedBy: displayName
        }
        
        var results = await addToPlaylist(currentRoomkey, element);
        if (results) {
            setQueued(true);
        }
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
                        queued ? 
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