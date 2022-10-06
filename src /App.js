import React from "react";
import ReactDom from "react-dom/client";
import "./App.css";
import EnTete from "./header/EnTete";
import Acceuil from "./guide/Acceuil";
import VideoVue from "./listContenaire/VideoVue";
import Login from "./connexion/Login";
import Logout from "./connexion/Logout";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import Video from "./Video";

const clienId =
  "532957026773-gvkujv0sc2dd2icc6f73s375erbd7oks.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    /*  gapi.load("client:auth2", () => {
      gapi.auth2.init({ clienId: clienId });
    }); */
    function start() {
      gapi.client.init({
        clienId: clienId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);
  return (
    <div className="App">
      <div className="yy">
        <EnTete />
      </div>
      <div className="kk">
        <Acceuil />
        <VideoVue />
      </div>
      <Login />
      <Logout />
    </div>
  );
}

export default App;
