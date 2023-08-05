import React, { useEffect } from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import QrCodeIcon from '@mui/icons-material/QrCode';
// import ViewStreamIcon from '@mui/icons-material/ViewStream';
// import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
// import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CategoryIcon from "@mui/icons-material/Category";
import { NavLink } from "react-router-dom";
import TagIcon from "@mui/icons-material/Tag";
import { useDispatch, useSelector } from "react-redux";
import { showAllUsers } from "../../../../store/admin/userSlice";

const SideBar = () => {
  const globalState = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showAllUsers());
  }, [dispatch]);

  return (
    <div className="sideBar">
      <div className="top">
        <span className="logo">Admin Blog</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <NavLink to="/admin/home">
            <li>
              <DashboardIcon className="icon-sidebar-admin" />
              <span>Home</span>
            </li>
          </NavLink>

          <p className="title">LISTS</p>
          {globalState.user.isAdmin && (
            <NavLink to="admin/users">
              <li>
                <PeopleAltIcon className="icon-sidebar-admin" />
                <span>Users</span>
              </li>
            </NavLink>
          )}

          <NavLink to="admin/category">
            <li>
              <CategoryIcon className="icon-sidebar-admin" />
              <span>Category</span>
            </li>
          </NavLink>

          <NavLink to="admin/tag">
            <li>
              <TagIcon className="icon-sidebar-admin" />
              <span>Tags</span>
            </li>
          </NavLink>

          <NavLink to="admin/article">
            <li>
              <CategoryIcon className="icon-sidebar-admin" />
              <span>Article</span>
            </li>
          </NavLink>

          {/* <li>
            <CategoryIcon className="icon" />
            <span>Category</span>
          </li>
          <li>
                <NotificationsIcon className='icon'/>
                <span>Notification</span>
            </li>
            <p className='title'>SERVICES</p>
            <li>
                <SettingsSuggestIcon className='icon'/>
                <span>settings</span>
            </li>
            <p className='title'>USER</p>
            <li>
                <AccountCircleIcon className='icon'/>
                <span>Profile</span>
            </li> 
            <li>
                <LogoutIcon className='icon'/>
                <span>Logout</span>
            </li> */}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
