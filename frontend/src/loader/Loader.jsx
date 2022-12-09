import React from "react";
import "./Loader.css";
import loader from "../../loader.gif";
const Loader = () => {
  return (
    <div className="position-load">
     {/*  <img className="lds-text" src={loader} /> */}
      <div className="lds-text">Chargement...</div>
    </div>
  );
};
export default Loader;
