
import '../../../css/Sidebar.css';
import Settings from './Settings';
import NotificationList from "./NotificaitonList";
const Profile = ({userId}) => {

    return (
        <div className="content notifications">
            <Settings/>
            <NotificationList userId={userId}/>
        </div>
    )

}
export default Profile;