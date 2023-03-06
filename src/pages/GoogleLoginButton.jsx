import React from 'react';
import { Button } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';


const auth = require('../config/constraints').firebaseAuth
const provider = new GoogleAuthProvider();

const login = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        // ...
    }).catch((error) => {
        console.log(error);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        // Handle Errors here.
        // ...
    }); 
}

const GoogleLoginButton = () => {
    return (
        <div>
            <br/>
            <Button variant="contained" size="large" onClick={() => {login()}}>
                <GoogleIcon/> &nbsp; &nbsp; <b>Login With Google</b>
            </Button>
        </div>
    )
}

export default GoogleLoginButton;