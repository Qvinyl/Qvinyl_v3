import React, {useEffect, useState, useRef} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import InvitationAccordion from '../Accordian/InvitationAccordion';
import RoundedInputField from '../InputField/RoundedInputField';
import UserList from '../../Sidebar/Rooms/UserList/UserList';
import AddedUserBox from '../../Sidebar/Rooms/UserList/AddedUserBox';
import { getUsers } from '../../../features/userService/UserInvitation';
import { Button } from '@mui/material';
import { createInvitation } from '../../../features/notificationService/Invitations';
import { sendNotification } from '../../../features/socketService/NotificationService';
import '../../../css/Modals.css';
import '../../../css/Room.css';

const InvitationModal = ({roomId, invitationModalOpen, handleInvitationModalClose, roomName, displayName}) => {
    const [expanded, setExpanded] = useState(false);
    const [searchUser, setSearchUser] = useState("");
    const [users, setUsers] = useState([])
    const [filteredList, setFilteredList] = useState(users)
    const [invitationList, setInvitationList] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    const sendInvitations = () => {
        if(invitationList.length > 0) {
            for (const invitee of invitationList) {
                var invite = {
                    user_id: invitee.user_id,
                    display_name: displayName,
                    room_id: roomId,
                    has_joined: false
                }
                var results = createInvitation(invite);
                if (results) {
                    sendNotification(invitee.user_id);
                }
            }
            handleInvitationModalClose();
        }
        else {
            console.log("invitation List is empty");
        }
    }

    const setSearchInput = (event) => {
        const newValue = event.target.value;
        setSearchUser(newValue);
        if (newValue) {
            setExpanded(true);
            var newList = users.filter(user => {
                const lc = (user.display_name).toLowerCase();
                return lc.includes(newValue.toLowerCase())
            });
            setFilteredList(newList);
        }
        else {
            setExpanded(false);
        }
    }

    const closeModal = () => {
        setSearchUser("");
        setFilteredList([]);
        setInvitationList([]);
        handleInvitationModalClose()
    }

    const fetchUsers = async () => {
        var userList = await getUsers();
        setUsers(userList);
    }

    const addToInvitationList = (user) => {
        var list = invitationList
        list.push(user);
        setInvitationList([...list]);
    };

    const removeFromInvitationList = (index) => {
        invitationList.splice(index, 1);
        setInvitationList([...invitationList]);
    }

    return (
        <div className="modals">
            <Dialog
                open={invitationModalOpen}
                onClose={handleInvitationModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Sending Invitations to <b>{roomName}</b>.   
                    <br/>
                    <br/>
                    <div className="proposed-text">Proposed Invitations to:</div>
                    {
                        invitationList.map((user, index) => 
                            <AddedUserBox key={index} index={index} removeFromInvitationList={removeFromInvitationList} user={user}/>
                        ) 
                    }
                    <InvitationAccordion disableGutters expanded={expanded}>
                        <AccordionSummary>
                            <RoundedInputField
                                value={searchUser}
                                label="Search users" 
                                onChange={setSearchInput} 
                                multiline 
                                maxRows={1} 
                            />
                        </AccordionSummary>
                        <AccordionDetails>
                            <UserList addToInvitationList={addToInvitationList} users={filteredList}/>
                        </AccordionDetails>
                    </InvitationAccordion>
                </DialogTitle>
                <DialogActions>
                    <Button onClick={sendInvitations}>Invite</Button>
                    <Button className="delete-button" onClick={closeModal}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default InvitationModal;