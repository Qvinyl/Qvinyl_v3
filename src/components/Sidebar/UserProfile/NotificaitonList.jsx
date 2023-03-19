import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NotificationItem from './NotificationItem'
import { fetchUserInvitations } from '../../../features/notificationService/Invitations';

const NotificationList = ({userId, joinRoom}) => {
    const[invitations, setInvitations] = useState([])

    useEffect(() => {
        fetchInvitations();
    }, [])

    const fetchInvitations = async () => {
        var invitations = await fetchUserInvitations(userId);
        setInvitations(invitations);
    }

    const removeOnSuccess = async (index) => {
        invitations.splice(index, 1);
        setInvitations([...invitations]);
    }
    
    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        invitations.map((item, index) =>
                            <TableRow key={index}>
                                <TableCell className="table-cell">
                                    <NotificationItem
                                        joinRoom={joinRoom}
                                        removeOnSuccess={removeOnSuccess}
                                        index={index}
                                        invitationId={item.id}
                                        roomkey={item.roomkey}
                                        roomName={item.room_name}
                                        inviter={item.display_name}
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