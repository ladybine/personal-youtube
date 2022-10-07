import React from "react";
import "./EnTete.css";
import logo from "./logo.png";
import Abonnement from "../abonement/Abonnement";

const EnTete = () => {
  return (
    <div className="Header-cotenair">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="barre-de-recherche">
        <input type="text" placeholder="Rechercher"></input>
        
      </div>
    </div>
  );
};

export default EnTete;
