import React from "react";
import "./Subscription.css";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../connexion/ContextLogin";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import Skeleton from "react-loading-skeleton";
import SkeletonCanal from "../loader/SkeletonCanal";

const API = import.meta.env.VITE_APP_API;
const fetchUrl2 = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=10&mine=true&key=${API}`;
const Subscription = () => {
  const [channel, setChannel] = useState([]);
  const [canalLoader, setCanalLoader] = useState(true);
  const { userToken, setUserToken } = useContext(userContext);

  useEffect(() => {
    fetch(fetchUrl2, { headers: { Authorization: "Bearer " + userToken } })
      .then((response) => response.json())
      .then((data) => {
        setChannel(data.items), setCanalLoader(false);
      });
  }, [userToken]);

  return (
    <div>
      <div className="border"></div>

      <ul className="subscription-list">Abonnements</ul>
      <div className="channel-list">
        {canalLoader
          ? [...Array(10)].map(() => {
              return <SkeletonCanal />;
            })
          : channel?.map((canal) => {
              return <ChannelItem key={canal.videoId} canal={canal} />;
            })}
      </div>
    </div>
  );
};

const ChannelItem = ({ canal }) => {
  const channelId = canal.snippet.resourceId.channelId;
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  return (
    <Link style={{ width: "23%" }} to={`/listVideo/${channelId}`}>
      <div className="oneChannel">
        <p style={{ width: "2rem" }}>{canal.snippet.title}</p>
        {(imgLoading || imgError) && (
          <Skeleton height={`2rem`} width={`2rem`} borderRadius={"50%"} />
        )}
        {!imgError && (
          <img
            src={canal?.snippet?.thumbnails?.medium?.url}
            onLoad={() => setImgLoading(false)}
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </Link>
  );
};

export default Subscription;
