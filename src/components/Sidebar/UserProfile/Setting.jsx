import React from 'react';
import '../../../css/Settings.css';


const Setting = ({icon, input}) => {
    return (
        <div className="setting-container">
            <div className="setting-icon">
                {input}
            </div>

            <div className="setting-text">
                {icon}
            </div>


        </div>
    )
}

export default Setting;