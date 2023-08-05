import React, { useEffect } from "react";
import { Outlet } from "react-router";
import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import "./userlayout.scss";
import Landing from "../landing/Landing";
import SideBar from "../sidebar/Sidebar";
import ScrollToTop from "../scrollToTop/ScrollToTop";
import Loader from "../../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../../../../store/user/loaderSlice";
import { checkLogUser } from "../../../../store/user/checkUserSlice";
import Pusher from "pusher-js";
import {
    addNotification,
    getNotifications,
} from "../../../../store/user/notificationSlice";
import { getData } from "../../../../services/utils/local-storage-utils";

const MainUserLayout = () => {
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (globalState.notification.check === true) {
            const pusherJs = new Pusher("e2a4954c3109b0eecca8", {
                cluster: "ap1",
                channelAuthorization: {
                    endpoint:
                        "https://blogback.srt.online/public/api/broadcasting/auth",
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + getData("token"),
                    },
                },
            });

            const channel = pusherJs.subscribe("private-private.1");

            channel.bind("App\\Events\\MessageTest", function (data) {
                dispatch(addNotification(data));
            });
        }
    }, [globalState.notification.check, dispatch]);

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
            <Landing />
            {/* <SocialSpeedDial /> */}
            <ScrollToTop />
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
};

export default MainUserLayout;
