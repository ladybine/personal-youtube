import React from 'react'
import Logo from '../header/logo.png'
import Login from './Login'
import Logout from './Logout'
const LoginAccueil = () => {
  return (
    <div>
      <img src={Logo}/>
      <Login/>
      <Logout/>
    </div>
  )
}

export default LoginAccueil
