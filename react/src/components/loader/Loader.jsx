import React from "react";
import "./loader.scss";

const Loader = ({ style }) => {
  return (
    <div className="loader" style={style}>
      <div className="ring-loader"></div>
      <span className="loading">K.G.S</span>
    </div>
  );
};

export default Loader;
