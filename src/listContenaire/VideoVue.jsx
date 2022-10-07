import React from "react";
import "./list.css";
import ChaineAbonné from "./ChaineAbonné";
import TousChaine from "./TousChaine";
import Kirua from "./kirua.jpg";
import Video from "../Video";
import { useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../connexion/ContextLogin";
import { useState } from "react";

const API = "AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g";
/* const API = "AIzaSyB-RXieYETW06rlqTtOZ3hsyoZNP4NhZgo"; */
const fechUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&key=${API}`;
const VideoVue = () => {
  const { userToken, setUserToken } = useContext(userContext);
  const [video, setVideo] = useState([]);
  useEffect(() => {
    fetch(fechUrl, { headers: { Authorization: "Bearer " + userToken } })
      .then((response) => response.json())
      .then((data) => setVideo(data));
  }, [userToken]);
  console.log(video);
  return (
    <div className="contenaire-videos">
      <div className="tt">
        <ChaineAbonné />
        <TousChaine />
      </div>
      <div className="video">
        <div className="kirua">
         {/*  {video.map((items) => (
            <div></div>
          ))} */}
        </div>

      </div>
    </div>
  );
};

export default VideoVue;
