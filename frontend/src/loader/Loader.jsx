import React from "react";
import "./Loader.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../Playlist/Channel.css";
import loader from "../../loader.gif";
const Loader = () => {
  return (
    <div className="position-load">
      {/*  <img className="lds-text" src={loader} /> */}
      {/*  <div className="lds-text">Chargement...</div>
      <Skeleton /> */}

      <SkeletonTheme baseColor="#343A40" highlightColor="#3C4147">
        <section>
          <div className="video">
            <div>
              <Skeleton height={100} />
            </div>
            <div style={{ marginTop: "7px" }}>
              <Skeleton height={12} width={`100%`} />
            </div>
            <div style={{ marginTop: "7px" }}>
              <Skeleton height={12} width={`40%`} />
            </div>
          </div>
        </section>
      </SkeletonTheme>
    </div>
  );
};
export default Loader;
