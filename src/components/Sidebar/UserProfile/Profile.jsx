
import '../../../css/Sidebar.css';
import Settings from './Settings';
import NotificationList from "./NotificaitonList";
const Profile = ({displayName, userId, joinRoom}) => {

    return (
        <div className="content notifications">
            <Settings displayName={displayName} userId={userId}/>
            <NotificationList userId={userId} joinRoom={joinRoom}/>
        </div>
    )

}
export default Profile;