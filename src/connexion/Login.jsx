import React, { Component, useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "./ContextLogin";
import "./login.css";
import google from './google.png'

function Login() {

  const {userToken, setUserToken}= useContext(userContext)
  const clienId =
    "532957026773-gvkujv0sc2dd2icc6f73s375erbd7oks.apps.googleusercontent.com";

  const nav = useNavigate();
  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        clienId,
        "https://www.googleapis.com/auth/youtube"
      );
      if (auth2.isSignedIn.get()) {
        updateUser(auth2.currentUser.get());
      } else {
        attachSignin(document.getElementById("signUpButton"), auth2);
      }
    };
    setAuth2();
  }, []);
  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  };
  const updateUser = (user) => {
    // console.log(user.xc.access_token);
    //localStorage.setItem('token',)
    setUserToken(user.xc.access_token);
    nav("/home");
  };
  
  return (
    <div id="signUpButton">
      <img src={google} />
      <button>Login with Google</button>
    </div>
  );
}
export default Login;
