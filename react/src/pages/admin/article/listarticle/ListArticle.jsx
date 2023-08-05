import React, { useEffect, useState } from "react";
import "./listarticle.scss";
import TableContainer from "../../../../components/admin/table/tablecontainer/TableContainer";
import TableListArticle from "../../../../components/admin/table/tablelistarticle/TableListArticle";
import { useDispatch, useSelector } from "react-redux";
import { showArticle } from "../../../../store/admin/articleSlice";
import Pagination from "@mui/material/Pagination";

const ListArticle = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const [page, setPage] = useState(1);

  // const articles = useMemo(() => {
  //   return globalState.article.articles;
  // }, [globalState.article.articles]);

  useEffect(() => {
    dispatch(showArticle({ page }));
  }, [dispatch, page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  console.log("render");

  return (
    <div>
      <div className="list-article">
        <TableContainer title="Article" data={globalState.article.articles}>
          <TableListArticle></TableListArticle>
        </TableContainer>
        <div className="pagination-container">
          <Pagination
            count={globalState.article.count}
            size="small"
            color="primary"
            variant="outlined"
            siblingCount={0}
            boundaryCount={0}
            page={page}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListArticle;
