import React from "react";
import "./Loader.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonCanal = () => {
  return (
    <div className="position-load">
      <SkeletonTheme baseColor="#343A40" highlightColor="#3C4147">
        <section>
          <div className="img-canal">
            <div className="tex-skeleton">
              <Skeleton />
            </div>
           <div>
              <Skeleton height={`2rem`} width={`2rem`} borderRadius={"50%"} />
            </div>
          </div>
        </section>
      </SkeletonTheme>
    </div>
  );
};
export default SkeletonCanal;
