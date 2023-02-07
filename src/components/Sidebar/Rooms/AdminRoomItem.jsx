import React from 'react';
import RoomAccordion from '../../Basics/Accordian/RoomAccordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RoomOption from './RoomOption';

const AdminRoomItem = ({roomId, name}) => {
    return (
        <div>
            <RoomAccordion disableGutters>
                    <AccordionSummary 
                        expandIcon={<ExpandMore className="add"/>}>
                        <Typography>
                            {name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <RoomOption option="Invite People" icon={<PersonAddIcon className="icon"/>}/>
                        <RoomOption option="Rename Room" icon={<EditIcon className="icon"/>}/>
                        <RoomOption option="Delete Room" icon={<DeleteOutlineIcon className="icon"/>}/>
                    </AccordionDetails>
                </RoomAccordion>
        </div>
    )
}

export default AdminRoomItem;