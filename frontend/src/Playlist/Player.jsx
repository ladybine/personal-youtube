import React from "react";
import { useParams } from "react-router-dom";
import "./Channel.css";
import CommentContainer from "../comment/CommentContainer";
import { useEffect } from "react";
import { useState } from "react";

const Player = ({ socket }) => {
  const API = import.meta.env.VITE_APP_API;
  const [titleVideo, setTitleVideo] = useState([]);
  const { wacthId } = useParams();
  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${wacthId}&key=${API}`
    )
      .then((response) => response.json())
      .then((data) => setTitleVideo(data.items));
  }, []);

  return (
    <div className="container__reading">
      <div className="reading">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${wacthId}`}
          title="YouTube video playe"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div>
          {titleVideo.map((title) => {
            return (
              <p className="titleofvideoreaging">{title?.snippet?.title}</p>
            );
          })}
        </div>
      </div>
      <CommentContainer videoId={wacthId} socket={socket} />
    </div>
  );
};

export default Player;
