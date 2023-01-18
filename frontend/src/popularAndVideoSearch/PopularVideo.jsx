import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import "../Playlist/Channel.css";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import numeral from "numeral";

// const API = "AIzaSyB-RXieYETW06rlqTtOZ3hsyoZNP4NhZgo";
const API = import.meta.env.VITE_APP_API;

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
  console.log(list);
  return (
    <div className="playlist">
      <div className="video-container">
        {loader
          ? [...Array(25)].map(() => {
              return <Loader />;
            })
          : list?.map((list, index) => {
              const wacthId = list.id;

              return (
                <Link
                  /* style={{ width: "23%" }} */ to={`/wacth/${wacthId}`}
                  key={index}
                >
                  <div className="video-list">
                    <img src={list?.snippet?.thumbnails?.medium?.url} />

                    <div className="playlist-title">
                      <div className="statistics">
                        <MdOutlineRemoveRedEye size={20} className="eyer" />
                        <div className="stat-number">
                          <p className="">
                            {numeral(list.statistics.commentCount).format(
                              "0,a"
                            )}
                          </p>
                          <p>vues</p>
                        </div>
                      </div>

                      <p className="video-title">{list?.snippet?.title}</p>

                      {/*  <img src={list.snippet.thumbnails.default.url} /> */}
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default PopularVideo;
