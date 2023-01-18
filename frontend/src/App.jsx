import React from "react";
import ReactDom from "react-dom/client";
import "./App.css";
import { gapi, loadAuth2 } from "gapi-script";
import { useEffect, useState } from "react";
import LoginHome from "./connexion/LoginHome";
import { Router, Routes, Route } from "react-router-dom";
import Screen from "./Screen";
import { userContext } from "./connexion/ContextLogin";
import PlaylistChannels from "./Playlist/PlaylistChannels";
import PopularVideo from "./popularAndVideoSearch/PopularVideo";
import Player from "./Playlist/Player";
import { createUsers } from "./services/Users";
import SearchComponent from "./popularAndVideoSearch/SearchComponent";
import socketIO from "socket.io-client";
const socket = socketIO.connect(import.meta.env.VITE_APP_API_BACKEND);
const clienId =
  "515896933221-cgpvtouavfnu5c8fpr025kd1qhgqstqt.apps.googleusercontent.com";
//3"1049288288589-6p8n3lmvfhok9q1o234ojopohemf07gq.apps.googleusercontent.com";
//1"532957026773-gvkujv0sc2dd2icc6f73s375erbd7oks.apps.googleusercontent.com";

function App() {
  const [userToken, setUserToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userDbInfo, setUserDbInfo] = useState();
  useEffect(() => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        clienId,
        "https://www.googleapis.com/auth/youtube.force-ssl"
      );
      console.log("auth2", auth2);
      if (auth2.isSignedIn.get()) {
        const userData = auth2.currentUser.get();
        setUserToken(userData.xc.access_token);
        setUserId(userData.wt.NT);
      }
    };
    setAuth2();
  }, []);

  useEffect(() => {
    if (userId) getUserDbInfo(userId);
  }, [userId]);

  const getUserDbInfo = (gapiId) => {
    fetch(`http://localhost:3000/users/user/${gapiId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserDbInfo(data);
      });
  };

  return (
    <userContext.Provider
      value={{
        userToken,
        setUserToken,
        userId,
        setUserId,
        userDbInfo,
        setUserDbInfo,
      }}
    >
      <Routes>
        <Route path="/" element={<LoginHome />} />
        <Route
          path="/home"
          element={
            <Screen>
              <PopularVideo />
            </Screen>
          }
        />
        <Route
          path="/listVideo/:channelId"
          element={
            <Screen>
              <PlaylistChannels />
            </Screen>
          }
        />
        <Route
          path="/video"
          element={
            <Screen>
              <PopularVideo />
            </Screen>
          }
        />
        <Route
          path="/wacth/:wacthId"
          element={
            <Screen>
              <Player socket={socket} />
            </Screen>
          }
        />
        <Route
          path="/result/:searchQuery"
          element={
            <Screen>
              <SearchComponent />
            </Screen>
          }
        />
      </Routes>
    </userContext.Provider>
  );
}

export default App;
