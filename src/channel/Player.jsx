import React from "react";
import { useParams } from "react-router-dom";
import './Channel.css'

const Player = () => {
  const { wacthId } = useParams();
  return (
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
  );
};

export default Player;
