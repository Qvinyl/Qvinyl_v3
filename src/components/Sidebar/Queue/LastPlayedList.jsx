import React from 'react';
import '../../../css/Queue.css'
import QueueItem from './QueueItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const LastPlayedList = () => {
    const queue = []

    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        queue.map((item) =>
                            <TableRow>
                                <TableCell>
                                    <QueueItem
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