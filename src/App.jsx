import React from "react";
import ReactDom from "react-dom/client";
import "./App.css";
import EnTete from "./header/EnTete";
import Acceuil from "./guide/Acceuil";
import VideoVue from "./listContenaire/VideoVue";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import Video from "./Video";
import LoginAccueil from "./connexion/LoginAccueil";
import Lecteur from "./listContenaire/Lecteur";
import {Router, Routes, Route} from 'react-router-dom'
import Screen from "./Screen";
import { userContext } from "./connexion/ContextLogin";

const clienId =
  "532957026773-gvkujv0sc2dd2icc6f73s375erbd7oks.apps.googleusercontent.com";

function App() {
  const [userToken, setUserToken]= useState('')
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
    <userContext.Provider value={{userToken, setUserToken}}>
      <Routes>
        <Route path="/" element={<LoginAccueil />} />
        <Route path="/home" element={<Screen />} />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
