import React from "react";
import { useParams } from "react-router-dom";
import "./Channel.css";
import CommentContainer from "../comment/CommentContainer";

const Player = ({ socket }) => {
  const { wacthId } = useParams();
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
      </div>
      <CommentContainer videoId={wacthId} socket={socket} />
    </div>
  );
};

export default Player;
