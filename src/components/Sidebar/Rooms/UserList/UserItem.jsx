import React from 'react';

const UserItem = ({user, addToInviteUserList}) => {

    return (
        <div onClick={() => addToInviteUserList(user)}>
            {user.display_name} ({user.email})
        </div>
    )
}

export default UserItem;