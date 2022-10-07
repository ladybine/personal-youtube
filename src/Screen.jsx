import React from "react";
import "./App.css";
import EnTete from "./header/EnTete";
import Acceuil from "./guide/Acceuil";
import VideoVue from "./listContenaire/VideoVue";
import Video from "./Video";
import Lecteur from "./listContenaire/Lecteur";
import Logout from "./connexion/Logout";

const Screen = () => {
  return (
    <div>
      <div className="yy">
        <EnTete />
      </div>
      <div className="kk">
        <Acceuil />
        <VideoVue />
      </div>
     {/*  <Lecteur /> */}
     
    </div>
  );
};

export default Screen;
