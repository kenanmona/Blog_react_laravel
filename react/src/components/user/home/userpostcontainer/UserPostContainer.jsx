import React from "react";
import { NavLink } from "react-router-dom";
import "./userpostcontainer.scss";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import encrypt from "../../../../services/crypto/encrypt";
const UserPostContainer = ({ category, data, children }) => {
  const posts = React.cloneElement(children, {
    category,
    data,
  });
  const encryptID = encrypt(category.id.toString());
  return (
    <div className="user-post-container">
      <div className="top">
        <div className="category">{category.name}</div>
        <div className="more">
          <NavLink to={`/filter/category/${encryptID}`}>
            More posts <NavigateNextIcon />
          </NavLink>
        </div>
      </div>
      {posts}
    </div>
  );
};

export default UserPostContainer;
