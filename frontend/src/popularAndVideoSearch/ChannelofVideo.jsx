import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChannelofVideo = () => {
  const API = import.meta.env.VITE_APP_API;
  const { channelId } = useParams();
  const [channelById, setChannelById] = useState([]);

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API}`
    )
      .then((res) => res.json())
      .then((items) => console.log(items));
  }, []);

  return <div>ChannelofVideo</div>;
};

export default ChannelofVideo;
