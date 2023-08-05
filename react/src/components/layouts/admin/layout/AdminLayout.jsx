import React, { useEffect } from "react";
import "./adminlayout.scss";
import SideBar from "../sidebar/SideBar";
import NavBar from "../navbar/NavBar";
import { Outlet, useNavigate } from "react-router";
import Settings from "../settings/Settings";
import { useDispatch, useSelector } from "react-redux";
import { checkAdmin } from "../../../../store/admin/privillageSlice";
import { checkMe } from "../../../../store/admin/userSlice";
const AdminLayout = () => {
    const globalState = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const admin = useMemo(() => {
    //   return globalState.privillage.success;
    // }, [globalState.privillage.success]);

    useEffect(() => {
        // if (!admin) {
        dispatch(checkAdmin())
            .unwrap()
            .then((data) => {
                dispatch(checkMe());
            })
            .catch((error) => navigate("/"));
        // }
    }, [dispatch, navigate]);
    return (
        <>
            {globalState.privillage.success && (
                <div
                    className={`layout ${globalState.mode.mode ? "" : "dark"}`}
                >
                    {/* <Settings /> */}
                    <SideBar />
                    <div className="layout-container">
                        <NavBar />
                        <Outlet />
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminLayout;
