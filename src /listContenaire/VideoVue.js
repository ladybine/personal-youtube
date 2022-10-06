import React from "react";
import "./list.css";
import ChaineAbonné from "./ChaineAbonné";
import TousChaine from "./TousChaine";
import Kirua from "./kirua.jpg";
import Video from "../Video";

const VideoVue = () => {
  return (
    <div className="contenaire-videos">
      <div className="tt">
        <ChaineAbonné />
        <TousChaine />
      </div>
      <div className="video">
        <div className="kirua">
          <Video />
        </div>

       {/*  {<img className="kirua" src={Kirua}></img>}
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img> */}
        {/* <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img>
        <img className="kirua" src={Kirua}></img> */}
      </div>
    </div>
  );
};

export default VideoVue;
