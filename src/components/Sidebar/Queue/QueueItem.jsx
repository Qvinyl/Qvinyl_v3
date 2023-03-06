import React, {useState} from 'react';
import QueuedButton from '../../Basics/Button/QueuedButton';
import { addToPlaylist } from '../../../features/queueService/Queuing/QueueServices';
import '../../../css/Queue.css';

const QueueItem = ({thumbnail, title, queuedBy, wasPlayed, url}) => {
    const [addedSuccessfully, setAddedStatus] = useState(false)

    const addToRoomPlaylist = (url, title, thumbnail, queuedBy) => {
        var element = {
            url: url,
            title: title, 
            thumbnail: thumbnail,
            queuedBy: "Josh Cheung"
        }
        if (addToPlaylist("43ed9d111e4523fd0572be22ecf3099a", element)) {
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
                            <QueuedButton onClick={() => {addToRoomPlaylist(url, title, thumbnail, queuedBy)}}>Requeue +</QueuedButton>
                            : 
                            <QueuedButton onClick={() => {addToRoomPlaylist(url, title, thumbnail, queuedBy)}}>Queue +</QueuedButton>
                    }
                    </div>
                }
            </div>
        </div>
    )
}
export default QueueItem;