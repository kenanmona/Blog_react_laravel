import React, { useEffect } from "react";
import { Outlet } from "react-router";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import SideBar from "../sidebar/Sidebar";
import "./userlayout.scss";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loader/Loader";
import { loading } from "../../../../store/user/loaderSlice";
import { checkLogUser } from "../../../../store/user/checkUserSlice";
import { getNotifications } from "../../../../store/user/notificationSlice";

const UserLayout = () => {
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLogUser());
        dispatch(getNotifications());
        return () => {
            dispatch(loading(""));
        };
    }, [dispatch]);

    if (globalState.loader.isLoading === "start") {
        return <Loader />;
    }
    return (
        <div
            className={`user-layout ${
                globalState.loader.isLoading === "" && "hidden-layout"
            }`}
        >
            <NavBar />
            {/* <SocialSpeedDial /> */}
            <ScrollToTop />
            <div className="empty-effect"></div>
            <div className="user-layout-container">
                <div className="flex container">
                    <div className="children">
                        <Outlet />
                    </div>
                    <SideBar />
                </div>
            </div>
            <Footer />
        </div>
    );
    /* } */
};

export default UserLayout;
