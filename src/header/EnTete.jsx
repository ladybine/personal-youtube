import React from "react";
import "./EnTete.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import search from "./search.png";
import { useState } from "react";
import Lecteur from "../listContenaire/Lecteur";

const EnTete = () => {
  const [text, setText] = useState("");
  const profil = localStorage.getItem("profilUser");

  return (
    <div className="Header-cotenair">
      <div className="logo">
        <img src={logo}></img>
      </div>
      <div className="profil-barre">
        <div className="profil">
          <img src={profil} />
        </div>

        <div className="barre-de-recherche">
          <input
            type="text"
            placeholder="Rechecher"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></input>
          <Link to={`/result/${text}`}>
            <button onClick={<Lecteur />}>
              <img className="search" src={search} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnTete;
