import React from "react";
import "./Acceuil.css";
import HouseSolid from "./house-solid.svg";
import Vector from "./Vector.svg";
import Vector2 from "./Vector2.svg";
import Abonnement from "../abonement/Abonnement";
import Logout from "../connexion/Logout";

import { NavLink } from "react-router-dom";

const Acceuil = () => {
  let activeStyle = {
    background: " #a81818",
  };
  return (
    <div className="Accueil-gauche">
      <div className="scroll">
        <NavLink
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          to={`/video`}
          end
        >
          <ul className="icone-acceuil">
            <img className="iconeHome" src={HouseSolid} />
            <p>Acceuil</p>
          </ul>
        </NavLink>

        <ul className="singup">
          <img className="icon-singup" src={Vector} />
          <Logout />
        </ul>
       

        <div>
          <Abonnement />
        </div>
      </div>
    </div>
  );
};

export default Acceuil;
