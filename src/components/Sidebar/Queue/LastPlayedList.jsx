import React, {useState, useEffect} from 'react';
import '../../../css/Queue.css'
import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { getLastPlayed } from '../../../features/queue/Queuing/QueueServices'; 

const LastPlayedList = () => {
    const [lastPlayed, setLastPlaylist] = useState([])

    useEffect(() => {
        getLastPlayed("43ed9d111e4523fd0572be22ecf3099a")
        .then(response => {
            setLastPlaylist(response);
        });
    });

    return (
        <div className="queue list">
            <Table>
                <TableBody>
                    {
                        lastPlayed.map((item) =>
                            <TableRow>
                                <TableCell className="table-cell">
                                    <QueueItem
                                        url={item.url}
                                        thumbnail={item.thumbnail}
                                        title={item.title}
                                        wasPlayed={true}
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

export default LastPlayedList;