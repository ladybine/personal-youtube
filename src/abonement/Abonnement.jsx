import React from "react";
import "./Abonnement.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../connexion/ContextLogin";
import { Link } from "react-router-dom";

const API = "AIzaSyB-RXieYETW06rlqTtOZ3hsyoZNP4NhZgo";
//3"AIzaSyCI24WELDXmRqPGABGo-LikcW7E-c-snSM"
//1"AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g";
const fetchUrl2 = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=10&mine=true&key=${API}`;
const Abonnement = () => {
  const [chaines, setChaine] = useState([]);
  const { userToken, setUserToken } = useContext(userContext);

  useEffect(() => {
    fetch(fetchUrl2, { headers: { Authorization: "Bearer " + userToken } })
      .then((response) => response.json())
      .then((data) => setChaine(data.items));
  }, [userToken]);
  

  return (
    <div>
      <div className="border"></div>;
      <ul className="liste-abonement">Abonnements</ul>
      <div className="chaine">
        {chaines?.map((chaine) => {
          const channelId = chaine.snippet.resourceId.channelId;
          return (
            <Link key={chaine.videoId} to={`/listVideo/${channelId}`}>
              <div className="affiche-chaine">
                <p>{chaine.snippet.title}</p>
                <img src={chaine?.snippet?.thumbnails?.medium?.url} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Abonnement;
