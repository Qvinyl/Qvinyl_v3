import {useEffect, useState} from 'react';
import QueueList from './QueueList';
import LastPlayedList from './LastPlayedList';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setPlaylist, setLastPlayed } from '../../../store/actions/queueActions';
import { getRoomPlaylist, getLastPlayed } from '../../../features/queueService/Queuing/QueueServices';
import CustomTabs from '../../Basics/Tabs/CustomTabs'; 

const PlaylistQueue = ({currentRoomkey, displayName}) => {
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        getPlaylist();
        getLastPlayedList();
    }, []);

    const getPlaylist = () => {
        getRoomPlaylist(currentRoomkey, setPlaylist, dispatch)
    }

    const getLastPlayedList = () => {
        getLastPlayed(currentRoomkey, setLastPlayed, dispatch)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className="content-container queue">
            <CustomTabs
                tabs=
                    {
                        [
                            {
                                name: "Queue",
                                component: <QueueList/>
                            },
                            {
                                name: "Last 25 Played",
                                component: 
                                    <LastPlayedList
                                        currentRoomkey={currentRoomkey}
                                        displayName={displayName}/>
                            }
                        ]
                    }
                />
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