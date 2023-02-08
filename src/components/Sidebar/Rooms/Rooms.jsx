import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import RoomList from './RoomList';
import Add from '../../Basics/Button/AddButton';
import AddRoom from './AddRoom';


import '../../../css/Room.css'

const Rooms = () => {
    return (
        <div className="content-container rooms">
            <AddRoom/>
            <RoomList/>
        </div>
    )
}

export default Rooms;