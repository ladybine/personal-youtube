import React from "react";
import "./SidbarMenu.css";
import HouseSolid from "./house-solid.svg";
import Vector from "./Vector.svg";
import Vector2 from "./Vector2.svg";
import Subscription from "../subscriptionContainer/Subscription";
import Logout from "../connexion/Logout";

import { NavLink } from "react-router-dom";

const SidbarMenu = () => {
  let activeStyle = {
    background: " #a81818",
  };
  return (
    <div className="sidbar-position">
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
          <Subscription />
        </div>
      </div>
    </div>
  );
};

export default SidbarMenu;
