import React from "react";
import "./Acceuil.css";
import HouseSolid from "./house-solid.svg";
import Vector from "./Vector.svg";
import Vector2 from "./Vector2.svg";
import Abonnement from "../abonement/Abonnement";

const Acceuil = () => {
  return (
    <div className="Accueil-gauche">
      <ul className="icone-acceuil">
        <img className="iconeHome" src={HouseSolid} />
        <p /* className="acceuil" */>Acceuil</p>
      </ul>
      <ul className="singup">
        <img className="icon-singup" src={Vector} />
        <a>Sign up</a>
      </ul>
      <ul className="paramettre">
        <img className="icone-paramettre" src={Vector2} />
        <p>paramettre</p>
      </ul>
      <div>
        <Abonnement />
      </div>
    </div>
  );
};

export default Acceuil;
