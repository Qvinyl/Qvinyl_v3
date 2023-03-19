import React from 'react';
import Room from './Room';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import '../../../css/Queue.css'


const RoomList = ({displayName, rooms, userId, removeRoom, currentRoomkey, setCurrentRoom}) => {
   
    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        rooms.map((room, index) =>
                            <TableRow 
                                key={room.roomkey}  
                                index={index} 
                                className={`table-row ${currentRoomkey === room.roomkey ? "active-row" : ""}`}>
                                <TableCell 
                                    className="table-cell">
                                    <Room 
                                        userId={userId}
                                        displayName={displayName}
                                        roomId={room.id}
                                        setCurrentRoom={setCurrentRoom}
                                        currentRoomkey={currentRoomkey}
                                        removeRoom={removeRoom}
                                        roomkey={room.roomkey}
                                        roomName={room.room_name}
                                        isAdmin={userId === room.admin}
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