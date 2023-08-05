import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import { checkUser } from "../../../../store/user/privillageSlice";
import "./authlayout.scss";
const AuthLayout = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(checkUser())
      .unwrap()
      .then((data) => navigate("/"))
      .catch((error) => {});
  }, [dispatch, navigate]);

  return <>{globalState.privillage.success && <Outlet />}</>;
};
export default AuthLayout;
