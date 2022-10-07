import React, { Component, useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import "./login.css";

const clienId =
  "532957026773-gvkujv0sc2dd2icc6f73s375erbd7oks.apps.googleusercontent.com";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        clienId,
        "https://www.googleapis.com/auth/youtube.force-ssl"
      );
      if (auth2.isSignedIn.get()) {
      }
    };
    setAuth2();
  }, []);
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
