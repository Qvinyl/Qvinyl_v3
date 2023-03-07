import { signOut } from "firebase/auth";
const auth = require('../../config/constraints').firebaseAuth;

const usersAPIEndpoint = "http://localhost:3000/api/v1/users";
let user = {}

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

export async function getUserInfo() {
    return user;
}

export async function getUserUid() {
    return user.user_id;
}

