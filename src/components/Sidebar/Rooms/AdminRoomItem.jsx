import {React, useState} from 'react';
import RoomAccordion from '../../Basics/Accordian/RoomAccordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RoomDeletionModal from '../../Basics/Modals/RoomDeletionModal';
import RoomOption from './RoomOption';
import { setUserCurrentRoomkey } from '../../../features/userService/UserAdministration';

const AdminRoomItem = ({roomkey, roomName, removeRoom, setCurrentRoom}) => {
    const [expanded, setExpanded] = useState(false);
    const [deletionModalOpen, setdeletionModalOpen] = useState(false);

    const handleDeleteModalOpen = () => {
        setdeletionModalOpen(true);
    };

    const handleDeleteModalclose = () => {
        setdeletionModalOpen(false);
    };

    const handleChange = (isExpanded) => {
        setExpanded(isExpanded);
    }
    
    const setCurrentRoomkey = () => {
        if  (setUserCurrentRoomkey(roomkey)) {
            setCurrentRoom(roomkey);
        }
    }
    
    return (
        <div>
            <RoomAccordion disableGutters expanded={expanded}>
                <AccordionSummary 
                    expandIcon={<ExpandMore className="add" onClick={() => handleChange(!expanded)}/>}>
                    <Typography onClick={() => {setCurrentRoomkey()}}>
                        <b>{roomName}</b>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <RoomOption option="Invite People" icon={<PersonAddIcon className="icon"/>}/>
                    <RoomOption option="Rename Room" icon={<EditIcon className="icon"/>}/>
                    <RoomOption 
                        action={handleDeleteModalOpen}
                        option="Delete Room" 
                        icon={<DeleteOutlineIcon 
                        className="icon"/>}
                        />
                </AccordionDetails>
            </RoomAccordion>
            <RoomDeletionModal 
                removeRoom={removeRoom}
                roomkey={roomkey}
                roomName={roomName}
                deletionModalOpen={deletionModalOpen} 
                handleDeleteModalclose={handleDeleteModalclose}
            />
        </div>
    )
}

export default AdminRoomItem;