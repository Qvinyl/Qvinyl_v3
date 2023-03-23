import { HOSTSITE, ORM_PORT } from "../../config/db_config";

const InvitationAPIEndpoint = `http://${HOSTSITE}:${ORM_PORT}/api/v1/invitations`

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
    var response = await fetch(userInvitationsEndpoint, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            has_joined: true 
        })
    })  

    return response.status === 200;
}

export async function createInvitation(invite) {
    var response = await fetch(InvitationAPIEndpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            invitation: invite
        })
    })

    return response.status === 200;
}

export async function declineInvitation(invite_id) {
    var deleteInvitationAPIEndpoint = `${InvitationAPIEndpoint}/${invite_id}`
    var response = await fetch(deleteInvitationAPIEndpoint, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: invite_id
        })
    })

    return response.status === 200;
}