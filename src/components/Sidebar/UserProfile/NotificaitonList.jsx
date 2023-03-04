import React, {} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NotificationItem from './NotificationItem'

const NotificationList = () => {
    const notifications = [
        
    ]
    
    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        notifications.map((item, index) =>
                            <TableRow key={index}>
                                <TableCell className="table-cell">
                                    <NotificationItem
                                        roomId={item.roomId}
                                        roomName={item.roomName}
                                        inviter={item.inviter}
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

export default NotificationList;