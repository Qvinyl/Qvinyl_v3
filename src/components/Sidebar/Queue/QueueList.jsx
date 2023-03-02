import React, {useState, useEffect} from 'react';
import '../../../css/Queue.css'
import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { getRoomPlaylist } from '../../../features/queue/Queuing/QueueServices';

const QueueList = () => {
    const [playlist, setRoomPlaylist] = useState([])

    useEffect(() => {
        getRoomPlaylist("43ed9d111e4523fd0572be22ecf3099a")
        .then(response => {
            setRoomPlaylist(response);
        });
    })

    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        playlist.map((item) =>
                            <TableRow>
                                <TableCell className="table-cell">
                                    <QueueItem
                                        thumbnail={item.thumbnail}
                                        title={item.title}
                                        queuedBy={item.queuedBy}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default QueueList;