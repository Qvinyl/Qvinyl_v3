import React from 'react';
import '../../../css/Queue.css'
import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const QueueList = () => {
    const queue = [
    ]

    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        queue.map((item) =>
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