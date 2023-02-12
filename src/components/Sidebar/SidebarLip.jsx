import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import '../../css/Sidebar.css';

const SidebarLip = ({isOpen, handleOnClickSidebarLip}) => {

    return (
        <div className="sidebar-lip" onClick={()=> handleOnClickSidebarLip(!isOpen)}> 
            {
                isOpen ? 
                <ArrowForwardIosIcon className="sidebar-lip-icon"/>
                : 
                <ArrowBackIosNewIcon className="sidebar-lip-icon"/> 
            }
        </div>
    )
}

export default SidebarLip;