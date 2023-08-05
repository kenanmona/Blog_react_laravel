import React from "react";
import { useNavigate } from "react-router-dom";
import "./widget.scss";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import WidgetFactory from "../../../../services/widget/WidgetFactory";
const Widget = ({ type, data }) => {
    // let { title, counter, link, icon } = WidgetFactory({ type: type });
    const navigate = useNavigate();

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{type}</span>
                <span className="counter">{data}</span>
                <span></span>
            </div>
            <div className="right">
                {/* <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    20%
                    </div>
                  {icon} */}
                <span></span>
                <span></span>
                {(type === "users" || type === "article") && (
                    <span
                        className="link"
                        onClick={() => navigate(`/admin/${type}`)}
                    >
                        See {type}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Widget;
