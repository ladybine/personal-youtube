import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../channel/Channel.css";

const API = "AIzaSyB-RXieYETW06rlqTtOZ3hsyoZNP4NhZgo";

const fetchUrl4 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US&key=${API}`;

const VideoVue = () => {
  const [list, setList] = useState();
  useEffect(() => {
    fetch(fetchUrl4)
      .then((response) => response.json())
      .then((data) => setList(data.items));
  }, []);
  console.log(list);

  return (
    <div className="playlist">
      <div className="flex1">
        {list?.map((list) => {
          const wacthId = list.id;
          console.log(wacthId);
          return (
            <Link to={`/wacth/${wacthId}`}>
              <div className="visuelVideo">
                <img src={list?.snippet?.thumbnails?.medium?.url} />

                <div className="playlistTitre">
                  <p className="titre-video">{list?.snippet?.title}</p>
                  <p className="titre-video">
                    {list.statistics.commentCount} vue
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VideoVue;
