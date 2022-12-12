import React from "react";
import logo from "../headers/logo.png";
import Login from "./Login";
import Logout from "./Logout";
import "./login.css";
const LoginHome = () => {
  return (
    <div>
      <div className="block-login">
        <div className="logo1">
          <img src={logo} />
        </div>

        <Login />
      </div>
    </div>
  );
};

export default LoginHome;
