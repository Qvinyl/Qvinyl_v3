import {React, useState} from 'react';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RoomDeletionModal from '../../Basics/Modals/RoomDeletionModal';
import RenameRoomModal from '../../Basics/Modals/RenameRoomModal';
import InvitationModal from '../../Basics/Modals/InvitationModal';
import ContentSlider from '../../Basics/ContentSlider/ContentSlider';
import RoomOption from './RoomOption';
import Tooltip from '@mui/material/Tooltip';

import { setUserCurrentRoomkey } from '../../../features/userService/UserAdministration';

const AdminRoomItem = ({displayName, roomId, roomkey, roomName, removeRoom, setCurrentRoom, userId, selected}) => {
    const [deletionModalOpen, setdeletionModalOpen] = useState(false);
    const [invitationModalOpen, setInvitationModalOpen] = useState(false);
    const [renameModalOpen, setRenameModalOpen] = useState(false);  
    const [updatedRoomName, setUpdatedRoomName] = useState(roomName);

    const handleInvitationModalOpen = () => {
        setInvitationModalOpen(true);
    };

    const handleInvitationModalClose = () => {
        setInvitationModalOpen(false);
    };

    const handleRenameModalOpen = () => {
        setRenameModalOpen(true);
    };

    const handleRenameModalClose = () => {
        setRenameModalOpen(false);
    };

    const handleDeleteModalOpen = () => {
        setdeletionModalOpen(true);
    };

    const handleDeleteModalclose = () => {
        setdeletionModalOpen(false);
    };

    const setCurrentRoomkey = async () => {
        var results = await setUserCurrentRoomkey(userId, roomkey)
        if  (results) {
            setCurrentRoom(roomkey);
        }
    }

    const updateRoomName = (updatedName) => {
        setUpdatedRoomName(updatedName)
    }
    
    return (
        <div>                    
            <div className="text-color-light room-item">
                <div className="room-item-container">
                    <Tooltip title="Join Room">
                        {
                            selected ?
                            <b className="room-item-text">{updatedRoomName}</b> 
                            :
                            <div className="room-item-text" onClick={() => {setCurrentRoomkey()}}>{updatedRoomName}</div> 
                        }
                    </Tooltip>
                
                    <div className="slider-container">
                        <ContentSlider 
                            content={
                                <div className="room-options-container">
                                    <div className="option-container">
                                        <RoomOption
                                            action={handleRenameModalOpen}
                                            option="Rename Room" 
                                            icon={<EditIcon className="icon"/>}
                                        /> 
                                    </div> 

                                    <div className="option-container">
                                        <RoomOption
                                            action={handleInvitationModalOpen}
                                            option="Invite People" 
                                            icon={<PersonAddIcon className="icon"/>}
                                        /> 
                                    </div>
                                    
                                    <div className="option-container">
                                        <RoomOption
                                            action={handleDeleteModalOpen}
                                            option="Delete Room" 
                                            icon={<DeleteOutlineIcon className="icon"/>}
                                        /> 
                                    </div>
                                </div> 
                            }
                        />
                    </div>
                </div>
            </div>

            <RoomDeletionModal 
                removeRoom={removeRoom}
                roomkey={roomkey}
                roomName={roomName}
                deletionModalOpen={deletionModalOpen} 
                handleDeleteModalclose={handleDeleteModalclose}
            />
            <InvitationModal 
                displayName={displayName}
                roomId={roomId}
                roomkey={roomkey}
                roomName={roomName}
                invitationModalOpen={invitationModalOpen}
                handleInvitationModalClose={handleInvitationModalClose}
            />
            <RenameRoomModal
                updateRoomName={updateRoomName}
                roomkey={roomkey}
                roomName={roomName}
                renameModalOpen={renameModalOpen} 
                handleRenameModalClose={handleRenameModalClose}
            />
        </div>
    )
}

export default AdminRoomItem;