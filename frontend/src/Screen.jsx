import React from "react";
import "./App.css";
import InTheHeaders from "./headers/InTheHeaders";
import SidbarMenu from "./sidbar/SidbarMenu";
import VideoVue from "./popularAndVideoSearch/PopularVideo";
//import Video from "./Video";
import { MdMenu } from "react-icons/md";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const Screen = ({ children }) => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const isDesktop = useMediaQuery({
    query: "(min-width: 425px)",
  });
  return (
    <div className="app">
      <div className="yy">
        <InTheHeaders />
      </div>
      <div className="menu">
        <MdMenu
          size={40}
          className="hamburger"
          onClick={() => {
            console.log("maki");
            setOpenSideBar(!openSideBar);
          }}
        />
      </div>

      <div className="kk">
        {(isDesktop || openSideBar) && <SidbarMenu />}
        {children}
      </div>
    </div>
  );
};

export default Screen;
