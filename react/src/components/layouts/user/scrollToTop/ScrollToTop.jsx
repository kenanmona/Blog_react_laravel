import React, { useEffect, useState } from "react";
import "./scrollToTop.scss";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
const ScrollToTop = () => {
  const [scrollToTop, setScrollToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setScrollToTop(true);
      } else {
        setScrollToTop(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {scrollToTop && (
        <div className="scroll-to-top" onClick={scrollUp}>
          <span className="scroll-progress">
            <KeyboardArrowUpOutlinedIcon />
          </span>
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
