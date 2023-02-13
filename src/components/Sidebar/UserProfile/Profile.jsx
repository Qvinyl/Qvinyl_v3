
import '../../../css/Sidebar.css';
import Settings from './Settings';
import NotificationList from "./NotificaitonList";
const Profile = () => {

    return (
        <div className="content notifications">
            <Settings/>
            <NotificationList/>
        </div>
    )

}
export default Profile;