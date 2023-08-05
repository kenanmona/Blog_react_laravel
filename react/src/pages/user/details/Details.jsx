import React, { useEffect, useState } from "react";
import "./details.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
// import required modules
import { Navigation } from "swiper";
import Comments from "../../../components/user/details/comments/Comments";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  likeCheck,
  showArticleById,
} from "../../../store/user/detailsSlice";
import { useNavigate, useParams } from "react-router";
import decrypt from "../../../services/crypto/decrypt";
// import { loading } from "../../../store/user/loaderSlice";
import Fade from "react-reveal/Fade";

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const globalState = useSelector((state) => state);
  const [check, setCheck] = useState(globalState.details.isLiked);
  const navigate = useNavigate();

  useEffect(() => {
    if (globalState.loader.isLoading === "") {
      dispatch(showArticleById({ id: decrypt(id) }))
        .unwrap()
        .then((data) => {})
        .catch((error) => {
          navigate("/page-not-found");
        });
    }
  }, [dispatch, id, globalState.loader.isLoading, navigate]);

  useEffect(() => {
    if (globalState.loader.isLoading === "") {
      dispatch(likeCheck({ article_id: decrypt(id) }));
    }
    setCheck(globalState.details.isLiked);
  }, [dispatch, id, globalState.loader.isLoading, globalState.details.isLiked]);

  return (
    <>
      <title>KGS | Details</title>
      {globalState.details.article && (
        <div className="details">
          <h1 className="post-title">{globalState.details.article.title}</h1>
          <div className="post-info">
            <div className="auther-profile">
              <img src={globalState.details.article.user.image} alt="" />
            </div>
            <div className="auther-name">
              {globalState.details.article.user.name}
            </div>
            <div>.</div>
            <div className="post-date">
              {globalState.details.article.dates.created_at}
            </div>
            <div>.</div>
            <div className="post-comments">
              {globalState.details.article.comments.length} Comments
            </div>
          </div>
          <div className="post-slider">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              className="mySwiper"
            >
              {globalState.details.article.images.map((img, index) => {
                return (
                  <SwiperSlide key={index} className="swiper-slide">
                    <img className="swiper-slide-img" src={img.image} alt="" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <Fade bottom>
            <div className="post-content">
              <span
                dangerouslySetInnerHTML={{
                  __html: globalState.details.article.description,
                }}
              />
            </div>
          </Fade>
          <div className="favorite">
            <div className="number-favorite">
              {globalState.details.article.likes} likes
            </div>
            <div className="favorite-icon">
              {globalState.checkUser.isLoggedIn && (
                <FavoriteIcon
                  className={`like ${check ? "active-like" : ""}`}
                  onClick={() => {
                    dispatch(addLike({ article_id: decrypt(id) }))
                      .unwrap()
                      .then((data) => setCheck((prev) => !prev))
                      .catch((err) => {});
                  }}
                />
              )}
            </div>
          </div>

          <Comments
            isLogged={globalState.checkUser.isLoggedIn}
            isClicked={globalState.details.isClicked}
            article_id={decrypt(id)}
            dispatch={dispatch}
            data={globalState.details.article.comments}
          />
        </div>
      )}
    </>
  );
};

export default Details;
