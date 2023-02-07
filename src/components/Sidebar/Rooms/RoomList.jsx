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
            name: "GYM JAMZ"
        },
        {
            roomId: "129837401928",
            name: "Baby Shark"
        },

    ]

    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        rooms.map((item) =>
                            <TableRow>
                                <TableCell borderLine>
                                    <Room 
                                        roomId={item.roomId}
                                        name={item.name}
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