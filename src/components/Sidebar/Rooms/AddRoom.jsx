import {React, useState} from 'react';
import CustomAccordion from '../../Basics/Accordian/CustomAccordion'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import Button from '@mui/material/Button';
import CustomTextField from '../../Basics/InputField/CustomTextField'


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
                    <Typography>
                        <div className="room-search-container" >
                            <RoundedInputField label="Search Your Rooms..." multiline maxRows={2} onClick={() => handleChange(false)}/>  
                        </div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <CustomTextField fullWidth id="standard-basic" label="Room Name..." variant="standard" />
                        <Button> Add Room </Button>
                        <Button onClick={() => handleChange(false)}> Cancel </Button>
                    </Typography>
                </AccordionDetails>
            </CustomAccordion>
        </div>
    )
}

export default AddRoom;
