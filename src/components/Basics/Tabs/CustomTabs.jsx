import {useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import './Tabs.css';
const CustomTabs = ({tabs}) => {
    const [value, setValue] = useState(0);
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className="content">
            <div className="queue-tabs component-tab">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth">
                    {
                        tabs.map((tab, index) => 
                            <Tab index={index} label={tab.name}/>
                        )
                    }    
                </Tabs>
            </div>
            <SwipeableViews 
                className="swipeable-view-container"
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                containerStyle={{height: '100%'}}
                onChangeIndex={handleChangeIndex}>
                {
                    tabs.map((tab, index) => 
                        <TabPanel 
                            value={value} 
                            index={index} 
                            dir={theme.direction}
                            children={tab.component}>
                        </TabPanel>
                    )
                } 
            </SwipeableViews>
        </div>
    )
}
export default CustomTabs;


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <>

            {value === index && (
                <div className="content">{children}</div>
            )}
        </>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};