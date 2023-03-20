import React, {} from 'react';
import '../../../css/Queue.css'
import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';

const QueueList = () => {
    const queue = useSelector((state) => state.queueReducer.queue);
    
    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        queue.map((item, index) =>
                            <TableRow 
                                className={`table-row ${index === 0 ? "active-row" : ""}`}
                                key={index}>
                                <TableCell className="table-cell">
                                    <QueueItem
                                        queue={queue}
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