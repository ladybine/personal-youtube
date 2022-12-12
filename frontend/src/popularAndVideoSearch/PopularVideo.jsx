import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import "../Playlist/Channel.css";

const API = "AIzaSyB-RXieYETW06rlqTtOZ3hsyoZNP4NhZgo";

const fetchUrl4 = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US&key=${API}`;

const PopularVideo = () => {
  const [list, setList] = useState();
  const [loader, setloader] = useState(true);
  useEffect(() => {
    fetch(fetchUrl4)
      .then((response) => response.json())
      .then((data) => {
        setList(data.items), setloader(false);
      });
  }, []);

  return (
    <div className="playlist">
      <div className="video-container">
        {loader ? (
          <Loader />
        ) : (
          list?.map((list, index) => {
            const wacthId = list.id;

            return (
              <Link
                /* style={{ width: "23%" }} */ to={`/wacth/${wacthId}`}
                key={index}
              >
                <div className="video-list">
                  <img src={list?.snippet?.thumbnails?.medium?.url} />

                  <div className="playlist-title">
                    <p className="video-title">{list?.snippet?.title}</p>
                    <p className="video-title">
                      {list.statistics.commentCount} vue
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PopularVideo;
