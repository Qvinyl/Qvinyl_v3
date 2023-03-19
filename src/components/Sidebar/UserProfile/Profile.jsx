
import '../../../css/Sidebar.css';
import Settings from './Settings';
import NotificationList from "./NotificaitonList";
const Profile = ({displayName, userId}) => {

    return (
        <div className="content notifications">
            <Settings displayName={displayName}/>
            <NotificationList userId={userId}/>
        </div>
    )

}
export default Profile;