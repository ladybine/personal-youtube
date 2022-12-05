import React from "react";
import "../header/EnTete.css";
import "../channel/Channel.css";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const Lecteur = () => {
  //cont api='AIzaSyAxYTdTGDlgbCAqKpQhTrVlpCN4l3Eyl0I'
  //1"AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g";
  const { searchQuery } = useParams();
  const [videoResult, setVideoResult] = useState([]);
  useEffect(() => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&q=${searchQuery}&safeSearch=none&key=AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g`
    )
      .then((response) => response.json())
      .then((data) => setVideoResult(data.items));
  }, [searchQuery]);

  return (
    <div className="playlist">
      {videoResult?.map((result, index) => {
        const wacthId = result.id.videoId;

        return (
          <Link to={`/wacth/${wacthId}`} key={index}>
            <div className="visuelVideo">
              <img src={result.snippet.thumbnails.medium.url} />
              <div className="playlistTitre">
                <p className="titre-video">{result.snippet.title}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Lecteur;
