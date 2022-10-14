import React from "react";
import "../abonement/Abonnement.css";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Channel.css";

const ChannelComponent = () => {
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
      .then((data) => setPlaylist(data.items))
     
  };

  // useEffect(() => {
  //   fetch(
  //     `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${canals}&key=${API}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setPlaylist(data));
  //   console.log(playlist);
  // }, [canals]);

  const nav = useNavigate();

  // const handleplayer = (wacthId) => {
  //   nav(`/wacth/:${wacthId}`);
  // };
  return (
    <div className="playlist">
      {playlist?.map((play) => {
        const wacthId = play.snippet.resourceId.videoId;
        
        return (
          <Link to={`/wacth/${wacthId}`}>
            <div className="visuelVideo">
              <img src={play?.snippet?.thumbnails?.medium?.url} />
              <div className="playlistTitre">
                <p className="titre-video">{play?.snippet?.title}</p>
              </div>

              <p>j'aime</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default ChannelComponent;
