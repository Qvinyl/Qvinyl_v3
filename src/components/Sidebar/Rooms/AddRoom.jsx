import {React, useState} from 'react';
import CustomAccordion from '../../Basics/Accordian/CustomAccordion'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import Button from '@mui/material/Button';
import CustomTextField from '../../Basics/InputField/CustomTextField'
import '../../../css/Room.css';

const AddRoom = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (isExpanded) => {
        setExpanded(isExpanded);
    };

    return (
        <div className="room-navigation component-tab">
            <CustomAccordion disableGutters expanded={expanded}>
                <AccordionSummary
                    expandIcon={<AddIcon className="add" onClick={() => handleChange(!expanded)}/>}>
                    <div className="room-search-container" >
                        <RoundedInputField label="Search Your Rooms..." multiline maxRows={2} onClick={() => handleChange(false)}/>  
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <CustomTextField fullWidth id="standard-basic" label="Room Name..." variant="standard" />
                    <div className="button-container">
                        <Button variant="contained" size="small"> Add Room </Button>
                        <Button className="cancel-button" variant="contained" size="small" onClick={() => handleChange(false)}> Cancel </Button>
                    </div>
                </AccordionDetails>
            </CustomAccordion>
        </div>
    )
}

export default AddRoom;
