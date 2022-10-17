import React from "react";
import "./Acceuil.css";
import HouseSolid from "./house-solid.svg";
import Vector from "./Vector.svg";
import Vector2 from "./Vector2.svg";
import Abonnement from "../abonement/Abonnement";
import Logout from "../connexion/Logout";
import Like from "./Like";
import { Link } from "react-router-dom";

const Acceuil = () => {
  return (
    <div className="Accueil-gauche">
      <Link to={`/video`}>
        <ul className="icone-acceuil">
          <img className="iconeHome" src={HouseSolid} />
          <p >Acceuil</p>
        </ul>
      </Link>

      <ul className="singup">
        <img className="icon-singup" src={Vector} />
        <Logout />
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
