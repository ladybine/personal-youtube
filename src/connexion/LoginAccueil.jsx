import React from 'react'
import logo from '../header/logo.png'
import Login from './Login'
import Logout from './Logout'
import './login.css'
const LoginAccueil = () => {
  return (
    <div>
      <div className="block-login">
        <div className='logo1'>
          <img src={logo} />
        </div>

        <Login />
        
      </div>
    </div>
  );
}

export default LoginAccueil
