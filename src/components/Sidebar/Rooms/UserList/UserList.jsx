import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import UserItem from './UserItem';
import '../../../../css/Room.css'

const UserList = ({users, addToInvitationList}) => {

    const addToInviteUserList = (user) => {
        addToInvitationList(user);
    }

    return (
        <div className="list">
            <Table>
                <TableBody>
                    {
                        users.map((user, index) =>
                            <TableRow 
                                className="user-invitation-row"
                                key={index}>
                                <TableCell className="table-cell">
                                    <UserItem addToInviteUserList={addToInviteUserList} user={user}/>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default UserList;