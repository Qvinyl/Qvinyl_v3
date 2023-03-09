import {useEffect, useState} from 'react';
import QueueList from './QueueList';
import LastPlayedList from './LastPlayedList';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { getRoomPlaylist, getLastPlayed } from '../../../features/queueService/Queuing/QueueServices'; 
import { getUserCurrentRoomkey } from '../../../features/userService/UserAdministration';

const PlaylistQueue = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [playlist, setRoomPlaylist] = useState([])
    const [lastPlayed, setLastPlaylist] = useState([])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    useEffect(() => {
        getPlaylist();
        getLastPlayedList();
    }, []);

    const getPlaylist = () => {
        var currentRoom = getUserCurrentRoomkey();
        getRoomPlaylist(currentRoom, setRoomPlaylist)
    }

    const getLastPlayedList = () => {
        var currentRoom = getUserCurrentRoomkey();
        getLastPlayed(currentRoom, setLastPlaylist)
    }

    return (
        <div className="content-container queue">
            <div className="queue-tabs component-tab">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth">
                    <Tab label="Queue" />
                    <Tab label="Last 25 Played" />
                </Tabs>
            </div>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
                    
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <QueueList
                        playlist={playlist}
                    />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <LastPlayedList
                        lastPlayed={lastPlayed}
                    />
                </TabPanel>
            </SwipeableViews>
        </div>
    )
}

export default PlaylistQueue;

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
            <Typography component={'span'}>{children}</Typography>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};