import React, {useState} from 'react';
import QueuedButton from '../../Basics/Button/QueuedButton';
import { addToPlaylist } from '../../../features/queueService/Queuing/QueueServices';
import '../../../css/Queue.css';

const QueueItem = ({thumbnail, title, queuedBy, wasPlayed, url, displayName, currentRoomkey}) => {
    const [addedSuccessfully, setAddedStatus] = useState(false)

    const addToRoomPlaylist = (url, title, thumbnail, queuedBy) => {
        var element = {
            url: url,
            title: title, 
            thumbnail: thumbnail,
            queuedBy: queuedBy
        }
        if (addToPlaylist(currentRoomkey, element)) {
            setAddedStatus(true)
        } else {
            setAddedStatus(false)
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
                <br/>
                {
                    queuedBy ?
                        <div className="queued-by-text text-color-light">Queued By {queuedBy}</div> 
                    :
                    <div>
                    { 
                        addedSuccessfully ? 
                            <QueuedButton className="queued" disabled>Queued</QueuedButton>
                        :
                            wasPlayed ? 
                            <QueuedButton onClick={() => {addToRoomPlaylist(url, title, thumbnail, displayName)}}>Requeue +</QueuedButton>
                            : 
                            <QueuedButton onClick={() => {addToRoomPlaylist(url, title, thumbnail, displayName)}}>Queue +</QueuedButton>
                    }
                    </div>
                }
            </div>
        </div>
    )
}
export default QueueItem;