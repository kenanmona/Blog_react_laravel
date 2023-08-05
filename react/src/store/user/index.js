import { configureStore } from "@reduxjs/toolkit";
import changePassword from "./changePasswordSlice";
import checkUser from "./checkUserSlice";
import details from "./detailsSlice";
import filter from "./filterSlice";
import forgetPassword from "./forgetPasswordSlice";
import loader from "./loaderSlice";
import login from "./login";
import notification from "./notificationSlice";
import privillage from "./privillageSlice";
import register from "./registerSlice";
import resendEmail from "./resendEmail";
import verifyEmail from "./verifyEmailSlice";

const user = configureStore({
  reducer: {
    register,
    verifyEmail,
    login,
    resendEmail,
    changePassword,
    forgetPassword,
    privillage,
    details,
    loader,
    checkUser,
    filter,
    notification,
  },
});

export default user;
