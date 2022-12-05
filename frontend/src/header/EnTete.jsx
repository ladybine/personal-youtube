import React from "react";
import "./EnTete.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import search from "./search.png";
import { useState } from "react";
import Lecteur from "../listContenaire/Lecteur";
import { Tooltip, Whisper } from "rsuite";
import useModal from "../popupEssaie/useModal";
import Modal from "../popupEssaie/Modal";
import "../popupEssaie/Modal.css";
import Vector from "./Vector.svg";

const EnTete = () => {
  const [text, setText] = useState("");
  const profil = localStorage.getItem("profilUser");
  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();

  return (
    <div className="header-back">
      <div className="Header-cotenair">
        <div className="logo">
          <img src={logo}></img>
        </div>
        <div className="profil-barre">
          {/*  essaie du popup */}
          <div className="profil">
            <Tooltip title="Modifier votre profil" arrow placement="top">
              <img
                className="modal-toggle"
                onClick={toggleLoginForm}
                src={profil}
              />
              <Modal isShowing={isLoginFormShowed} hide={toggleLoginForm}>
                <img className="modal-profil" src={profil} />
                <p className="modal-profil-name">Barbine iduma</p>
                <form>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Modier la photo du profil"
                    />
                    {/*  <i className="pen" src={Vector} /> */}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Modifier les noms d'utilisateur"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Modifier le lien facebook"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Modifier le lien instagram"
                    />
                  </div>

                  <div className="">
                    <input
                      className="btn-valider"
                      type="submit"
                      value="Valider"
                    />
                  </div>
                </form>
              </Modal>
            </Tooltip>
            {/* fin du popu */}
          </div>

          <div className="barre-de-recherche">
            <input
              type="text"
              placeholder="Rechecher"
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></input>
            <Link to={`/result/${text}`}>
              <button className="btn-search" onClick={<Lecteur />}>
                <img className="search" src={search} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnTete;
