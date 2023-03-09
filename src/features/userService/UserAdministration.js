import { signOut } from "firebase/auth";
const auth = require('../../config/constraints').firebaseAuth;

const usersAPIEndpoint = "http://localhost:3000/api/v1/users";
var user = {}

export async function getUserInfo() {
    return user;
}

export async function getUserUid() {
    return user.user_id;
}

export function getUserCurrentRoomkey() {
    return user.current_room_id;
}

export async function setUserCurrentRoomkey(roomkey) {
    var currentRoomkey = getUserCurrentRoomkey();

    if (currentRoomkey === roomkey) {
        return;
    }
    userJoinRoom(roomkey)
    .then(isSet => {
        if (isSet) {
            console.log(roomkey);
            user.current_room_id = roomkey;
        }
    }); 
}

//Check to see if user already exists
export async function findOrCreateUser(userInfo) {
    var getUserByUid = `${usersAPIEndpoint}/${userInfo.uid}`
    await fetch(getUserByUid, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(content => {
        if (content === null) {
            createNewUser(userInfo);
        }
        else {
            user = content;
        }
    })
    .catch((error) => {
        return false;
    });
}

// Create New User 
async function createNewUser(userInfo) {
    fetch(usersAPIEndpoint, {
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
    .then(response => response.json())
    .then((results) => {
        user = results; 
    })
    .catch((error) => {
        return false;
    });
}

export async function logout() {
    signOut(auth).then((results) => {
        return true;
    }).catch((error) => {
        return false;
    });
}

export async function userJoinRoom(roomkey) {
    var joinRoomEndpoint = `${usersAPIEndpoint}/joinRoom`;
    fetch(joinRoomEndpoint, {
        method: "PUT",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
            user_id: user.user_id,
            roomkey: roomkey,
        })
    })
    .then(response => {
        response.json()
        if (response.status === 200) {
            return true;
        }
    })
    .catch((error) => {
        return false;
    });
    return true;
}

