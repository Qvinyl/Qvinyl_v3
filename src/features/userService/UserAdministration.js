import { signOut } from "firebase/auth";
const auth = require('../../config/constraints').firebaseAuth;

const usersAPIEndpoint = "http://localhost:3000/api/v1/users";
var USER = {}

export async function getUserInfo() {
    return USER;
}

export async function getUserUid() {
    return USER.user_id;
}

export function getUserCurrentRoomkey() {
    return USER.current_room_id;
}

export async function setUserCurrentRoomkey(userId, roomkey) {
    var currentRoomkey = getUserCurrentRoomkey();
    if (currentRoomkey === roomkey) {
        return;
    }
    return await userJoinRoom(userId, roomkey);
}

//Check to see if user already exists
export async function findOrCreateUser(userInfo) {
    var getUserByUid = `${usersAPIEndpoint}/${userInfo.uid}`
    var response = await fetch(getUserByUid);  
    var user = await response.json();
    if (user === null) {
        user = await createNewUser(userInfo);
        
    }
    return await user;
}

// Create New User 
async function createNewUser(userInfo) {
    var response = await fetch(usersAPIEndpoint, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            user_id: userInfo.uid,
            name: userInfo.displayName,
            email: userInfo.email,
            display_name: userInfo.displayName,
        })
    })
    var user = await response.json();
    return user;
}

export async function logout() {
    signOut(auth).then((results) => {
        return true;
    }).catch((error) => {
        return false;
    });
}

export async function userJoinRoom(userId, roomkey) {
    var joinRoomEndpoint = `${usersAPIEndpoint}/joinRoom`;
    var response = await fetch(joinRoomEndpoint, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            user_id: userId,
            roomkey: roomkey,
        })
    })
    return response.status == 200;
}

