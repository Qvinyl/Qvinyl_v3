import React, { useEffect, useState, useCallback } from 'react';
import NotificationList from './NotificaitonList'
const Notification = () => {

    return (
        <div>
            <div className="component-label">
                <div className="lettering-white">
                </div>
            </div>
            <div>
                <NotificationList/>
            </div>
        </div>
    )

}
export default Notification;