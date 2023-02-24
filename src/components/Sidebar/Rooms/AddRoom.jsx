import {React, useRef, useState, useEffect} from 'react';
import CustomAccordion from '../../Basics/Accordian/CustomAccordion'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import Button from '@mui/material/Button';
import CustomTextField from '../../Basics/InputField/CustomTextField'
import {createVirtualRoom} from '../../../features/rooms/RoomCreation';

const AddRoom = () => {
    const [expanded, setExpanded] = useState(false);
    const [roomName, setRoomName] = useState("");
    const inputReference = useRef(null);

    useEffect(() => {
        inputReference.current.focus();
    }, []);
    

    const setRoomNameInput = (event) => {
        const newValue = event.target.value;
        setRoomName(newValue);
    }

    const handleChange = (isExpanded) => {
        setExpanded(isExpanded);
        setRoomName("");
    };

    const createRoom = () => {   
        if (!isBlank(roomName)) {
            createVirtualRoom(roomName);
            handleChange(false);
        } 
        else {
            console.log("Room name is blank");
        }
    }

    const isBlank = (str) => {
        return (!str || /^\s*$/.test(str));
    }

    return (
        <div className="room-navigation component-tab">
            <CustomAccordion disableGutters expanded={expanded}>
                <AccordionSummary
                    expandIcon={<AddIcon className="add" onClick={() => handleChange(!expanded)}/>}>
                    <div className="room-search-container" >
                        <RoundedInputField 
                            inputRef={inputReference} 
                            label="Search Your Rooms..." 
                            multiline maxRows={2} 
                            onClick={() => handleChange(false)}
                        />  
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <CustomTextField  
                        type="text" 
                        value={roomName}
                        onChange={setRoomNameInput} 
                        fullWidth label="Room Name" variant="standard" 
                    />
                    <Button onClick={() => createRoom()}> Add Room </Button>
                    <Button onClick={() => handleChange(!expanded)}> Cancel </Button>
                </AccordionDetails>
            </CustomAccordion>
        </div>
    )
}

export default AddRoom;
