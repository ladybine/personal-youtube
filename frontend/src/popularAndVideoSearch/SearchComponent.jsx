import React from "react";
import "../headers/IntheHeaders.css";
import "../Playlist/Channel.css";
import Loader from "../loader/Loader";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const SearchComponent = () => {
  //cont api='AIzaSyAxYTdTGDlgbCAqKpQhTrVlpCN4l3Eyl0I'
  //1"AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g";
  const { searchQuery } = useParams();
  const [videoResult, setVideoResult] = useState([]);
  const [loader, setloader] = useState(true);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&type=video&q=${searchQuery}&safeSearch=none&key=AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g`
    )
      .then((response) => response.json())
      .then((data) => {
        setVideoResult(data.items), setloader(false);
      });
  }, [searchQuery]);

  return (
    <div className="playlist">
      {loader
        ? [...Array(25)].map(() => {
            return <Loader />;
          })
        : videoResult?.map((result, index) => {
            const wacthId = result.id.videoId;

            return (
              <Link to={`/wacth/${wacthId}`} key={index}>
                <div className="video-list">
                  <img src={result.snippet.thumbnails.medium.url} />
                  <div className="playlist-title">
                    <p className="video-title">{result.snippet.title}</p>
                  </div>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default SearchComponent;
