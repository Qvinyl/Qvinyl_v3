import {React, useRef, useState, useEffect} from 'react';
import CustomAccordion from '../../Basics/Accordian/CustomAccordion'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import Button from '@mui/material/Button';
import CustomTextField from '../../Basics/InputField/CustomTextField'


const AddRoom = () => {
    const [expanded, setExpanded] = useState(false);
    const inputReference = useRef(null);

    useEffect(() => {
        inputReference.current.focus();
    }, []);


    const handleChange = (isExpanded) => {
        setExpanded(isExpanded);
    };

    return (
        <div className="room-navigation component-tab">
            <CustomAccordion disableGutters expanded={expanded}>
                <AccordionSummary
                    expandIcon={<AddIcon className="add" onClick={() => handleChange(!expanded)}/>}>
                    <div className="room-search-container" >
                        <RoundedInputField inputRef={inputReference} label="Search Your Rooms..." multiline maxRows={2} onClick={() => handleChange(false)}/>  
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <CustomTextField fullWidth id="standard-basic" label="Room Name..." variant="standard" />
                    <Button> Add Room </Button>
                    <Button onClick={() => handleChange(false)}> Cancel </Button>
                </AccordionDetails>
            </CustomAccordion>
        </div>
    )
}

export default AddRoom;
