import React, { useState } from "react";
import "./socialSpeedDial.scss";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CloseIcon from "@mui/icons-material/Close";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const SocialSpeedDial = () => {
  const [show, setShow] = useState("");
  const [dispaly, setDisplay] = useState(false);
  const [rotate, setRotate] = useState(false);

  const showIcons = () => {
    show === "" ? setShow("open-icon") : setShow("");
    setRotate((prev) => !prev);
    setTimeout(() => {
      setDisplay((prev) => !prev);
    }, 400);
  };

  return (
    <div className="social-speed-dial">
      <div className={`social-icon ${show}`}>
        <span>
          <LinkedInIcon style={{ color: "white" }} />
        </span>
        <span>
          <GitHubIcon style={{ color: "white" }} />
        </span>
        <span>
          <LinkedInIcon style={{ color: "white" }} />
        </span>
      </div>
      <div onClick={showIcons} className="speed-dial-button">
        <ContactSupportIcon
          className={`crash icon ${dispaly ? "display" : ""} ${
            rotate ? "rotate" : ""
          }`}
        />
        <CloseIcon
          className={` icon ${!dispaly ? "display" : ""} ${
            !rotate ? "rotate" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default SocialSpeedDial;
