import React from "react";
import { Table, TableRow, TableCell, Button} from "@mui/material";
import VideoCallWindow from "./VideoCallWindow";

const VideoCall = ({userId}) => {
    const users = [
        {
            name: "Josh Cheung",
            user_id: "iizkp6MTfvXOOPCWP20CymWYYJI2"
        },
        {
            name: "Heather Tang",
            user_id: "p3cinJqPa1OBmyc7infAYM0vgsZ2"
        },
        {
            name: "Matt Tang",
            user_id: "jQOAdUSev8RbXCWWe5haQjF6F472"
        }
    ]

    return (
        <div>
            <Table>
                {/* <VideoCallWindow userId={userId} id={"local-video"} /> */}
                {/* { 
                    users.map((user, index) => 
                        <VideoCallWindow user={user} userId={userId} />
                    )
                } */}
                <VideoCallWindow userId={userId} id={"local-video"} />
            </Table>    
        </div>
    )
}

export default VideoCall;