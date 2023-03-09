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

export async function setUserCurrentRoomkey(roomkey) {
    var currentRoomkey = getUserCurrentRoomkey();

    if (currentRoomkey === roomkey) {
        return;
    }
    userJoinRoom(roomkey)
    .then(isSet => {
        if (isSet) {
            console.log(roomkey);
            USER.current_room_id = roomkey;
        }
    }); 
}

//Check to see if user already exists
export async function findOrCreateUser(userInfo, setUser) {
    var getUserByUid = `${usersAPIEndpoint}/${userInfo.uid}`
    var response = await fetch(getUserByUid);  
    var user = await response.json();
    USER = user;
    setUser(user);
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
        USER = results; 
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
            user_id: USER.user_id,
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
        console.log(error);
    });
    return true;
}

