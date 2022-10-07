import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

const clienId =
  "532957026773-gvkujv0sc2dd2icc6f73s375erbd7oks.apps.googleusercontent.com";

const responseGoogle = (response) => {
  console.log(response.accessToken);
};

const onSuccess = (res) => {
  console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
};
const onFailure = (res) => {
  console.log("LOGIN FAILED! res:", res);
};
function Login() {
  return (
    <div id="signUpButton">
      <GoogleLogin
         clientId={clienId}
        buttonText="login"
        onSuccess={onSuccess}
        onFailure={onFailure}
         cookiePolicy={"single_host_origin"}
        scope=""
      />
    </div>
  );
}
export default Login;
