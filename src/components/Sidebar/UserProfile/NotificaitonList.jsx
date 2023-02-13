import React, {} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NotificationItem from './NotificationItem'

const NotificationList = () => {
    const notifications = [
        {
            roomId: "123o47o21389740981",
            inviter: "Joshua Cheung",
            roomName: "Gym Jamz",
        },
        {
            roomId: "438702934857",
            inviter: "Curtis Cheung",
            roomName: "Music Box",
        },
        {
            roomId: "345890730",
            inviter: "Nicholas Cheung",
            roomName: "Lofi Study",
        },
        {
            roomId: "123o47o21389740981",
            inviter: "Joshua Cheung",
            roomName: "Gym Jamz",
        },
        {
            roomId: "438702934857",
            inviter: "Curtis Cheung",
            roomName: "Music Box",
        },
        {
            roomId: "345890730",
            inviter: "Nicholas Cheung",
            roomName: "Lofi Study",
        },
        {
            roomId: "123o47o21389740981",
            inviter: "Joshua Cheung",
            roomName: "Gym Jamz",
        },
        {
            roomId: "438702934857",
            inviter: "Curtis Cheung",
            roomName: "Music Box",
        },
        {
            roomId: "345890730",
            inviter: "Nicholas Cheung",
            roomName: "Lofi Study",
        }
    ]
    
    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        notifications.map((item) =>
                            <TableRow>
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