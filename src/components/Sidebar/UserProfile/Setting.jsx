import React from 'react';
import '../../../css/Settings.css';


const Setting = ({icon, input, action}) => {
    return (
        <div className="setting-container" onClick={() => action()}>
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