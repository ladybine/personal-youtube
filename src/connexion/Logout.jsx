import React, { Component, useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import "./login.css";

const clienId =
"515896933221-cgpvtouavfnu5c8fpr025kd1qhgqstqt.apps.googleusercontent.com";
  //3"1049288288589-6p8n3lmvfhok9q1o234ojopohemf07gq.apps.googleusercontent.com";
  //1"532957026773-gvkujv0sc2dd2icc6f73s375erbd7oks.apps.googleusercontent.com";

function Logout() {
  const navigate = useNavigate();
  
  const signOut = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      navigate("/");
      console.log("User signed out.");
    });
  };
  /* 
    const onSuccess= ()=>{
        console.log('Log out successfull')
    } */
  return (
    <div id="signOutButton" onClick={signOut}>
      Logout
      {/*  <GoogleLogout
            clientId={clienId}
            buttonText='Logout'
            onLogoutSuccess={onSuccess}/> */}
    </div>
  );
}
export default Logout;
