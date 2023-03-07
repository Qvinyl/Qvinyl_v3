import React, { useState, useEffect } from 'react';
import { getAdminRooms } from '../../../features/roomService/RoomService';
import Room from './Room';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import '../../../css/Queue.css'


const RoomList = ({rooms, user_id}) => {
    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        rooms.map((room) =>
                            <TableRow key={room.id}>
                                <TableCell className="table-cell">
                                    <Room 
                                        roomkey={room.roomkey}
                                        roomName={room.room_name}
                                        isAdmin={user_id == room.admin}
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

export default RoomList;