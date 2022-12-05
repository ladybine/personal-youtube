import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../connexion/ContextLogin";
import { useState } from "react";

/* 
const API =//3 "AIzaSyCI24WELDXmRqPGABGo-LikcW7E-c-snSM";
"AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g"; */
//const fechUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&myRating=like&key=${API}`;
const Like = () => {
  const { userToken, setUserToken } = useContext(userContext);
  const [videos, setVideo] = useState([]);
  useEffect(() => {
    fetch(fechUrl, { headers: { Authorization: "Bearer " + userToken } })
      .then((response) => response.json())
      .then((data) => setVideo(data.items));
  }, [userToken]);
  console.log(videos);
  return (
    <div>
      <div className="video">
        <div className="kirua">
          {videos?.map((video) => {
            return (
              <div className="visuelVideo">
                <img src={video?.snippet?.thumbnails?.medium?.url} />
                <div className="titre">
                  <p className="titre-video">{video.snippet.localized.title}</p>
                </div>
                <p>j'aime</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Like;
