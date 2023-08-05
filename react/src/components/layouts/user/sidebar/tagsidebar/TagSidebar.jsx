import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { loading } from "../../../../../store/user/loaderSlice";
import "./tagSidebar.scss";

const TagSidebar = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <NavLink to={`/filter/tag/${data.name}`}>
      <span
        className="tag-name"
        onClick={() => {
          dispatch(loading(""));
        }}
      >
        {data.name}
      </span>
    </NavLink>
  );
};

export default TagSidebar;
