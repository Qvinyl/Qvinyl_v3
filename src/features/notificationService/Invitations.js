const InvitationAPIEndpoint = "http://localhost:3000/api/v1/invitations"

export async function fetchUserInvitations(user_id) {
    const userInvitationsEndpoint = `${InvitationAPIEndpoint}/${user_id}`;
    var response = await fetch(userInvitationsEndpoint, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });

    var invitations = await response.json();
    return await invitations;
}

export async function acceptInvitation(invitationId) {
    const userInvitationsEndpoint = `${InvitationAPIEndpoint}/${invitationId}`;
    fetch(userInvitationsEndpoint, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            has_joined: true 
        })
    })  
    .then(response => {
        response.json()
        if(response.status === 200) {
            return true;
        }
    })
    .catch((e) => {
        console.log(e);
    });
}

export async function createInvitation(invite) {
    fetch(InvitationAPIEndpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            invitation: invite
        })
    })
    .then(response => {
        response.json()
        if(response.status === 200) {
            return true;
        }
    })
    .catch((e) => {
        console.log(e);
        return false;
    });
}