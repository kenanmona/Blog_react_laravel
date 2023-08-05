import React, { useEffect, useState } from "react";
import UserPost from "../../../components/user/home/userposts/UserPost";
// import usePostHook from "../../../services/hooks/usePostHook";
import "./filter.scss";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { filterArticle } from "../../../store/user/filterSlice";
import { loading } from "../../../store/user/loaderSlice";
import decrypt from "../../../services/crypto/decrypt";

const Filter = () => {
  /* const data = usePostHook(); */
  const dispatch = useDispatch();
  const { tag, category } = useParams();
  const globalState = useSelector((state) => state);
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    dispatch(loading(""));
  };

  useEffect(() => {
    if (globalState.loader.isLoading === "") {
      dispatch(filterArticle({ page, tag, category: decrypt(category) }));
    }
  });

  return (
    <>
      <title>KGS | Filter</title>
      <div className="filter-container">
        <UserPost
          category={{ name: "filter" }}
          data={globalState.filter.articles}
          dispaly={true}
        />
        <div className="pagination-container">
          <Pagination
            count={globalState.filter.count}
            size="small"
            color="primary"
            variant="outlined"
            siblingCount={0}
            boundaryCount={0}
            page={globalState.filter.page}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default Filter;
