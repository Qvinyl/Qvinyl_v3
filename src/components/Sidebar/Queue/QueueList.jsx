import React, {} from 'react';
import '../../../css/Queue.css'
import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const QueueList = ({playlist}) => {

    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        playlist.map((item, index) =>
                            <TableRow 
                                className={`table-row ${index === 0 ? "active-row" : ""}`}
                                key={index}>
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