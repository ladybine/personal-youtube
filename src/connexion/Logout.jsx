

import React, { Component } from "react";

import {GoogleLogout } from "react-google-login";

const clienId =
  "532957026773-gvkujv0sc2dd2icc6f73s375erbd7oks.apps.googleusercontent.com";

  function Logout(){

    const onSuccess= ()=>{
        console.log('Log out successfull')
    }
    return(
        <div id="signOutButton">
            <GoogleLogout
            clientId={clienId}
            buttonText='Logout'
            onLogoutSuccess={onSuccess}/>

        </div>
    )
  }
  export default Logout;