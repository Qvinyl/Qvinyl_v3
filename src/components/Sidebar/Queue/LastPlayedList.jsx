import React, {} from 'react';
import '../../../css/Queue.css'
import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const LastPlayedList = ({lastPlayed}) => {
    return (
        <div className="queue list">
            <Table>
                <TableBody>
                    {
                        lastPlayed.map((item, index) =>
                            <TableRow 
                                className="table-row"
                                key={index}>
                                <TableCell 
                                    className="table-cell">
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