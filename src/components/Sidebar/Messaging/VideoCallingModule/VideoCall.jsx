import React from "react";
import { Table, TableBody, TableRow, TableCell, Button} from "@mui/material";
import VideoCallWindow from "./VideoCallWindow";

const VideoCall = ({userId, users}) => {
    console.dir(users);
    return (
        <Table>
            <TableBody>
                <VideoCallWindow userId={userId} id={"local-video"} />
                <VideoCallWindow userId={userId} id={"jQOAdUSev8RbXCWWe5haQjF6F472"} />
                <VideoCallWindow userId={userId} id={"p3cinJqPa1OBmyc7infAYM0vgsZ2"} />
                    {/* { 
                        users.map((user, index) => 
                            <VideoCallWindow key={user?.userId} user={user} userId={userId} id={user?.userId} />
                        )
                    } */}
            </TableBody>               
        </Table>    
    )
}

export default VideoCall;