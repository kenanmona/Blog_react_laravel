import React from "react";
import { Link } from "react-router-dom";
import encrypt from "../../../../services/crypto/encrypt";
import Tag from "../../../user/home/tag/Tag";
import "./landingpart.scss";
const LandingPart = ({ data }) => {
  const encryptID = encrypt(data?.id.toString());
  return (
    <span className="landing-part">
      <img src={data?.images[0]?.image} alt="article"></img>
      <ul className="article-info">
        <Tag data={data?.tag} />
        <li className="article-title">
          <Link to={`/details/${encryptID}`}>{data?.title} </Link>
        </li>
        <li className="article-author">
          <img src={data?.user.image} alt="author"></img>
          <span>{data?.user.name}</span>
          <span className="dot">.</span>
          <span>{data?.dates.created_at}</span>
        </li>
      </ul>
    </span>
  );
};

export default LandingPart;
