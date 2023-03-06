import React from 'react';
import Qvinyl from '../media/Qvinyl.png'
import '../css/Login.css'

const Login = () => {
    return (
        <div className="background">
            <div className="logo-containter">
                <img className="logo" alt="Logo" src={Qvinyl}/>
            </div>
        </div>
    )
}

export default Login;