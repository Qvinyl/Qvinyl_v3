import {React, useRef, useState, useEffect} from 'react';
import CustomAccordion from '../../Basics/Accordian/CustomAccordion'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import Button from '@mui/material/Button';
import CustomTextField from '../../Basics/InputField/CustomTextField'
import {createVirtualRoom} from '../../../features/roomService/RoomCreation';
import SnackBar from '../../Basics/SnackBar/SnackBar';

const AddRoom = ({uid}) => {
    const [expanded, setExpanded] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [successful, setSuccess] = useState(true);
    const [snackbar, setSnackBar] = useState(false);
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

    const handleSnackBarOpen = (isOpen) => {
        setSnackBar(isOpen);
    }

    const handleSnackBarClose = (isOpen) => {
        setSnackBar(isOpen);
    }

    const roomCreation = () => {   
        if (!isBlank(roomName)) {
            createRoom();
        } 
        else {
            console.log("Room name is blank");
        }
    }

    const createRoom = () => {
        createVirtualRoom(uid, roomName).then(isSuccessful => {
            if (isSuccessful) {
                handleChange(false);
                setSuccess(true);
            }
            else {
                setSuccess(false);
            }
        });
        handleSnackBarOpen(true)
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
                    <Button onClick={() => roomCreation()}> Add Room </Button>
                    <Button onClick={() => handleChange(!expanded)}> Cancel </Button>
                </AccordionDetails>
            </CustomAccordion>
            {
                successful ? 
                <SnackBar open={snackbar} handleSnackBarClose={handleSnackBarClose} isSuccessful={successful} message={"Successfully created room"}/>
                :
                <SnackBar open={snackbar} handleSnackBarClose={handleSnackBarClose} isSuccessful={successful} message={"Room creation unsuccessful"}/>
            }
        </div>
    )
}

export default AddRoom;
