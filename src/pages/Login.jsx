import React from 'react';
import Qvinyl from '../media/Qvinyl.png'
import GoogleLoginButton from './GoogleLoginButton';
import '../css/Login.css'

const Login = () => {
    return (
        <div className="background">
            <div className="content-containter">
                <div className="logo-containter">
                    <img className="logo" alt="Logo" src={Qvinyl}/>
                </div>
                <div className="login-button-container">
                    <GoogleLoginButton/>
                </div>
            </div>
        </div>
    )
}

export default Login;