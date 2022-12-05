import React from "react";
import "./App.css";
import EnTete from "./header/EnTete";
import Acceuil from "./guide/Acceuil";
import VideoVue from "./listContenaire/VideoVue";
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
        <EnTete />
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
        {(isDesktop || openSideBar) && <Acceuil />}
        {children}
      </div>
    </div>
  );
};

export default Screen;
