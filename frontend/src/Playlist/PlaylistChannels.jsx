import React from "react";
import "../subscriptionContainer/Subscription.css";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./Channel.css";

const PlaylistChannels = () => {
  const API = "AIzaSyB-RXieYETW06rlqTtOZ3hsyoZNP4NhZgo";
  //3"AIzaSyCI24WELDXmRqPGABGo-LikcW7E-c-snSM";
  //1 "AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g";
  const { channelId } = useParams();
  const [playlist, setPlaylist] = useState();
  const [canals, setCanals] = useState([]);
  const fetchUrl3 = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${API}`;
  useEffect(() => {
    fetch(fetchUrl3)
      .then((response) => response.json())
      .then((data) => {
        setCanals(data.items[0].contentDetails.relatedPlaylists.uploads);
        return data.items[0].contentDetails.relatedPlaylists.uploads;
      })
      .then((canal) => {
        secondApicall(canal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const secondApicall = (canals) => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${canals}&key=${API}`
    )
      .then((response) => response.json())
      .then((data) => setPlaylist(data.items));
  };

  return (
    <div className="playlist">
      {playlist?.map((play, index) => {
        const wacthId = play.snippet.resourceId.videoId;

        return (
          <Link key={index} style={{ width: "20%" }} to={`/wacth/${wacthId}`}>
            <div className="video-list">
              <img
                className="subscription-video"
                src={play?.snippet?.thumbnails?.medium?.url}
              />
              <div className="playlist-title">
                <p className="video-title">{play?.snippet?.title}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default PlaylistChannels;
