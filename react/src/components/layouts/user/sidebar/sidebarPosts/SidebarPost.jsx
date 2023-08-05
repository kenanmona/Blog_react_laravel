import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import encrypt from "../../../../../services/crypto/encrypt";
import { loading } from "../../../../../store/user/loaderSlice";
import "./sidebarPost.scss";
const SidebarPost = ({ data }) => {
  const dispatch = useDispatch();
  const encryptID = encrypt(data.id.toString());
  return (
    <>
      {
        <div className="popular">
          <div className="post" key={encryptID}>
            <div className="img" data-id={data.likes}>
              <img src={data?.images[0]?.image} alt="popular" />
            </div>
            <div className="info">
              <h4 className="title">
                <Link
                  to={`/details/${encryptID}`}
                  style={{ color: "#000" }}
                  onClick={() => {
                    dispatch(loading(""));
                  }}
                >
                  {data.title}
                </Link>
              </h4>
              <p className="date">{data.dates.created_at}</p>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default SidebarPost;
