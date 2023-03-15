import React from 'react';
import { Button } from '@mui/material';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import GoogleIcon from '@mui/icons-material/Google';
const auth = require('../config/constraints').firebaseAuth;
const provider = new GoogleAuthProvider();

const login = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        return user;
    }).catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
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