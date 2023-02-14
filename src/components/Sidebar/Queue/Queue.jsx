import React from 'react';
import QueueList from './QueueList';
import LastPlayedList from './LastPlayedList';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import RoundedInputField from '../../Basics/InputField/RoundedInputField'
import '../../../css/Queue.css'

const Queue = () => {
    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className="content-container queue" id="queue-component">
            <div className="queue-tabs component-tab">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    >
                    <Tab label="Queue" />
                    <Tab label="Last 25 Played" />
                </Tabs>
            </div>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <QueueList/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <LastPlayedList/>
                </TabPanel>
            </SwipeableViews>
            <div className="input-field send" >
                <RoundedInputField label="Search/Paste from Youtube" multiline maxRows={4}  />
            </div>
        </div>
    )
}

export default Queue;


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Typography>{children}</Typography>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};