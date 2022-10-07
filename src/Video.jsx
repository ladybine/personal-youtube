import { useEffect, useState } from "react";
import React from "react";
import "../src/listContenaire/list.css";
 
const API = "AIzaSyCWbRRgiUGXc5gjERPSmOtx5OqMDJxcD2g"; 
/* const API = "AIzaSyB-RXieYETW06rlqTtOZ3hsyoZNP4NhZgo"; */

const channelId = "UCmFt1y9cbHx3amPRctMEyvA";

let fetcUrl = `https:youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=${API}`;

const Video = () => {
  const [allvideo, setAllvideo] = useState([]);

  useEffect(() => {
    fetch(fetcUrl)
      .then((response) => response.json())
      .then((resJson) => {
        console.log(resJson);

        const result = resJson.items.map((doc) => ({
          ...doc,
          videolink: "https://www.youtube.com/embed/" + doc.id.videoId,
        }));
        setAllvideo(result);
      });
  }, []);

  console.log(allvideo);

  return (
    <div>
      <div>
        {allvideo.map((video) => {
          return (
            <div className="videos">
              <iframe
                className="kirua"
                display="flex"
                flex-direction="row"
                width="200"
                height="315"
                src={video.videolink}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Video;
