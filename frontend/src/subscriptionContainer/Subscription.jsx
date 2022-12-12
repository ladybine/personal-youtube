import React from "react";
import "./Subscription.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../connexion/ContextLogin";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const API = "AIzaSyB-RXieYETW06rlqTtOZ3hsyoZNP4NhZgo";
//3"AIzaSyCI24WELDXmRqPGABGo-LikcW7E-c-snSM"
//1"AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g";
const fetchUrl2 = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=10&mine=true&key=${API}`;
const Subscription = () => {
  const [channel, setChannel] = useState([]);
  const { userToken, setUserToken } = useContext(userContext);

  useEffect(() => {
    fetch(fetchUrl2, { headers: { Authorization: "Bearer " + userToken } })
      .then((response) => response.json())
      .then((data) => setChannel(data.items));
  }, [userToken]);

  return (
    <div>
      <div className="border"></div>

      <ul className="subscription-list">Abonnements</ul>
      <div className="channel-list">
        {channel?.map((canal) => {
          const channelId = canal.snippet.resourceId.channelId;
          return (
            <Link
              style={{ width: "23%" }}
              key={canal.videoId}
              to={`/listVideo/${channelId}`}
            >
              <div className="oneChannel">
                <p style={{ width: "2rem" }}>{canal.snippet.title}</p>
                <img src={canal?.snippet?.thumbnails?.medium?.url} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Subscription;
