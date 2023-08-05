import React from "react";
import "./toaststyle.scss";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
const ToastStyle = ({ icon, result }) => {
  return (
    <>
      {icon ? (
        <div className="toast">
          <SentimentSatisfiedAltIcon
            color="success"
            style={{ fontSize: "40px" }}
          />{" "}
          <div className="text">{result}</div>
        </div>
      ) : (
        <div className="toast">
          <SentimentVeryDissatisfiedIcon
            style={{ fontSize: "40px", color: "red" }}
          />
          <div className="text">{result}</div>
        </div>
      )}
    </>
  );
};
export default ToastStyle;
