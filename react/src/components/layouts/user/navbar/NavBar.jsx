import React, { useEffect, useState } from "react";
import "./navbar.scss";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import DropDown from "../dropdown/DropDown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLogUser, logOut } from "../../../../store/user/checkUserSlice";
import { useQuery } from "react-query";
import { request } from "../../../../services/utils/axios-utils";
import Notifications from "./notifications/Notifications";
import Loader from "../../../loader/Loader";

const NavBar = () => {
    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [loader, setLoader] = useState(true);

    const [closeNotification, setCloseNotification] = useState("");

    const onSuccess = (data) => {
        setCategory((prev) => {
            return (prev = data?.data?.data);
        });
    };

    const { isFetching, isLoading, refetch } = useQuery(
        "category",
        async () => {
            return await request({ url: "/user/category/show" });
        },
        {
            enabled: false,
            onSuccess,
            staleTime: 3600000,
            refetchOnWindowFocus: false,
        }
    );
    const { data } = useQuery("user-profile", () => {
        return request({ url: "/me" });
    });

    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleState = (bool) => {
        setToggle((prev) => {
            return (prev = bool);
        });
    };
    const openDrop = () => {
        if (!open) {
            refetch();
        }
        setOpen((prev) => !prev);
    };
    useEffect(() => {
        dispatch(checkLogUser());
        const clearTime = setTimeout(() => {
            setLoader((prev) => {
                return false;
            });
        }, 1000);
        return () => {
            clearTimeout(clearTime);
        };
    });

    if (loader) {
        return <Loader />;
    }

    return (
        <>
            <Notifications
                closeNotification={closeNotification}
                setCloseNotification={setCloseNotification}
                dispatch={dispatch}
            />
            <div className="navbar-user">
                <div className="container">
                    <Link to="/" className="logo">
                        <img src="/imgs/knowledge.png" alt="" />
                        {/* KGS */}
                        {/* <p>
              <span style={{ color: "rgb(77, 4, 4)" }}>A</span>
              <span style={{ color: "rgb(99, 4, 94)" }}>L</span>
              <span style={{ color: "red" }}>W</span>
              <span style={{ color: "green" }}>A</span>
              <span style={{ color: "rgb(252, 248, 8)" }}>N</span>
            </p> */}
                    </Link>

                    <ul className={`main-nav ${toggle ? "main-nav-show" : ""}`}>
                        <CloseIcon
                            className="close"
                            onClick={() => toggleState(false)}
                        />

                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li onClick={openDrop}>
                            <span>
                                Category{" "}
                                <KeyboardArrowDownOutlinedIcon
                                    className={`arrow ${open ? "rotate" : ""}`}
                                />
                            </span>
                            <DropDown
                                isFetching={isFetching}
                                isLoading={isLoading}
                                open={open}
                                data={category}
                            />
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        {globalState.checkUser.isLoggedIn === true && (
                            <li>
                                <span className="note-user">
                                    <NotificationsActiveOutlinedIcon
                                        onClick={() =>
                                            closeNotification === ""
                                                ? setCloseNotification(
                                                      "open-notes"
                                                  )
                                                : setCloseNotification("")
                                        }
                                    />
                                    <div className="counter">
                                        {
                                            globalState.notification
                                                .notifications.length
                                        }
                                    </div>
                                </span>
                            </li>
                        )}

                        {globalState.checkUser.isLoggedIn === true && (
                            <li>
                                <span className="note-user">
                                    <LogoutIcon
                                        onClick={() => {
                                            dispatch(logOut())
                                                .unwrap()
                                                .then((data) => {
                                                    console.log("asd");
                                                    navigate("/login");
                                                })
                                                .catch((error) => {});
                                        }}
                                    />
                                </span>
                            </li>
                        )}
                        {globalState.checkUser.isLoggedIn === true && (
                            <li>
                                <span className="item">
                                    <div
                                        className="avatar"
                                        onClick={() =>
                                            navigate("/user-profile")
                                        }
                                    >
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
                                </span>
                            </li>
                        )}
                        {globalState.checkUser.isLoggedIn === false && (
                            <li>
                                <Link to="/login">
                                    <button>Log In</button>
                                </Link>
                            </li>
                        )}
                    </ul>

                    <MenuOutlinedIcon
                        className="menu"
                        onClick={() => toggleState(!toggle)}
                    />
                </div>
            </div>
        </>
    );
};

export default NavBar;
