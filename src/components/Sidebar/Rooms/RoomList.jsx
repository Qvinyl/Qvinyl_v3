import React from 'react';
import '../../../css/Queue.css'
import Room from './Room';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


const RoomList = () => {
    const rooms = [
        {
            roomId: "1234198237490801",
            roomName: "GYM JAMZ",
            isAdmin: true
        },
        {
            roomId: "129837401928",
            roomName: "Baby Shark",
            isAdmin: false
        },

    ]

    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        rooms.map((item) =>
                            <TableRow>
                                <TableCell className="table-cell">
                                    <Room 
                                        roomId={item.roomId}
                                        roomName={item.roomName}
                                        isAdmin={item.isAdmin}
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