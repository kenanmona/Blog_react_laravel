import React from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PublicIcon from "@mui/icons-material/Public";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../../../store/admin/modeSlice";
import { useQuery } from "react-query";
import { request } from "../../../../services/utils/axios-utils";
const NavBar = () => {
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const { data } = useQuery("user-profile", () => {
        return request({ url: "/me" });
    });
    // console.log(data.data.data.image);
    return (
        <div className="navBar">
            <div className="wrapper">
                {/* left side */}
                <div className="">
                    {/* <input type="text" placeholder="Search ..." />
          <SearchOutlinedIcon /> */}
                </div>
                {/* right side */}
                <div className="items">
                    {/* <div className="item">
            <PublicIcon className="icon" />
          </div> */}
                    <div className="item" onClick={() => dispatch(change())}>
                        {globalState.mode.mode ? (
                            <NightlightOutlinedIcon className="icon" />
                        ) : (
                            <LightModeOutlinedIcon className="icon" />
                        )}
                    </div>
                    {/* <div className="item">
            <NotificationsActiveOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
                    {/* <div className="item">
            <MenuOutlinedIcon className="icon" />
          </div> */}
                    {/* <div className="item">
                        <div className="avatar">
                            <img
                                className="img-profile"
                                src={
                                    data === undefined
                                        ? "http://localhost:8000/storage/uploads/user_image/default.jpg"
                                        : data?.data?.data?.image
                                }
                                alt=""
                            />
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
