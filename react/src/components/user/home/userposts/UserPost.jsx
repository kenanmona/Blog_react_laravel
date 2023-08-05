import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import encrypt from "../../../../services/crypto/encrypt";
import { loading } from "../../../../store/user/loaderSlice";
import Tag from "../tag/Tag";
import "./userpost.scss";
import Fade from "react-reveal/Fade";

const UserPost = ({ category, data, dispaly = false }) => {
  const dispatch = useDispatch();

  const cut = (str) => {
    return str.slice(0, 30) + "...";
  };
  const result = data.map((item, index) => {
    const encryptID = encrypt(item.id.toString());

    return (
      <Fade bottom>
        <div className="card" key={index}>
          <div className="image">
            <img
              src={
                item.images.length > 0
                  ? item.images[0].image
                  : "/imgs/image-default.jpg"
              }
              alt=""
            ></img>
          </div>
          <div className="description">
            <Tag data={item.tag} />
            <Link
              to={`/details/${encryptID}`}
              onClick={() => dispatch(loading(""))}
            >
              {item.title}
            </Link>
            <p className={`${dispaly ? "" : "hidden"}`}>
              <span
                dangerouslySetInnerHTML={{
                  __html: cut(item.description),
                }}
              />
            </p>
            <div className="article-date">{item.dates.created_at}</div>
          </div>
        </div>
      </Fade>
    );
  });

  return <div className={`${category.name} technology`}>{result}</div>;
};

export default UserPost;
