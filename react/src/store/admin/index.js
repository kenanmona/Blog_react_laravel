import { configureStore } from "@reduxjs/toolkit";
import category from "./categorySlice";
import privillage from "./privillageSlice";
import mode from "./modeSlice";
import tag from "./tagSlice";
import article from "./articleSlice";
import comment from "./commentSlice";
import user from "./userSlice";

const admin = configureStore({
  reducer: {
    category,
    privillage,
    mode,
    tag,
    article,
    comment,
    user,
  },
});
export default admin;
