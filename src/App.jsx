import React from "react";
import ReactDom from "react-dom/client";
import "./App.css";

import { gapi, loadAuth2 } from "gapi-script";
import { useEffect, useState } from "react";
import LoginAccueil from "./connexion/LoginAccueil";
import { Router, Routes, Route } from "react-router-dom";
import Screen from "./Screen";
import { userContext } from "./connexion/ContextLogin";
import ChannelComponent from "./channel/ChannelComponent";

import VideoVue from "./listContenaire/VideoVue";
import Player from "./channel/Player";
import Lecteur from "./listContenaire/Lecteur";
import EnTete from "./header/EnTete";
const clienId =
  "515896933221-cgpvtouavfnu5c8fpr025kd1qhgqstqt.apps.googleusercontent.com";
//3"1049288288589-6p8n3lmvfhok9q1o234ojopohemf07gq.apps.googleusercontent.com";
//1"532957026773-gvkujv0sc2dd2icc6f73s375erbd7oks.apps.googleusercontent.com";

function App() {
  const [userToken, setUserToken] = useState("");
  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        clienId,
        "https://www.googleapis.com/auth/youtube.force-ssl"
      );
      if (auth2.isSignedIn.get()) {
        const userData = auth2.currentUser.get();
        setUserToken(userData.xc.access_token);
      }
    };
    setAuth2();
  }, []);
  return (
    <userContext.Provider value={{ userToken, setUserToken }}>
      <Routes>
        <Route path="/" element={<LoginAccueil />} />
        <Route
          path="/home"
          element={
            <Screen>
              <VideoVue />
            </Screen>
          }
        />
        <Route
          path="/listVideo/:channelId"
          element={
            <Screen>
              <ChannelComponent />
            </Screen>
          }
        />
        <Route
          path="/video"
          element={
            <Screen>
              <VideoVue />
            </Screen>
          }
        />
        <Route
          path="/wacth/:wacthId"
          element={
            <Screen>
              <Player />
            </Screen>
          }
        />
        <Route
          path="/result/:searchQuery"
          element={
            <Screen>
              <Lecteur />
            </Screen>
          }
        />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
