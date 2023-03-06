import { signOut } from "firebase/auth";
const auth = require('../../config/constraints').firebaseAuth;

export async function logout() {
    signOut(auth).then((results) => {
        return true;
    }).catch((error) => {

    });
    return false;
}