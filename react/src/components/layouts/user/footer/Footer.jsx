import React from "react";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import "./footer.scss";
const Footer = () => {
  return (
    <div className="footer">
      <div className="box">
        <div className="lightbar"></div>
        <div className="toplayer"></div>
        <h2 className="name-footer">Knowledge Geeks</h2>
      </div>

      {/* <div className="container">
        <div className="flex">
          <div className="box">
            <h2>About us </h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries.{" "}
            </p>
          </div>
          <div className="box">
            <h2>Categories</h2>
            <ul className="links">
              <li>Tech</li>
              <li>Medical</li>
              <li>Life Style</li>
              <li>Summer</li>
            </ul>
          </div>
        </div>{" "}
        *
        <div className="end">
          <p>
            <span style={{ color: "rgb(77, 4, 4)" }}>A</span>
            <span style={{ color: "rgb(99, 4, 94)" }}>L</span>
            <span style={{ color: "red" }}>W</span>
            <span style={{ color: "green" }}>A</span>
            <span style={{ color: "rgb(252, 248, 8)" }}>N</span>{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
