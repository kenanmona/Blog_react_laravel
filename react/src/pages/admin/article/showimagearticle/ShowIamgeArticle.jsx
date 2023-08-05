import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import TableContainer from "../../../../components/admin/table/tablecontainer/TableContainer";
import TableListImage from "../../../../components/admin/table/tablelistimage/TableListImage";
import decrypt from "../../../../services/crypto/decrypt";
import {
  resetImages,
  showImagesArticle,
} from "../../../../store/admin/articleSlice";
import "./showimagearticle.scss";
const ShowIamgeArticle = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const { article } = useParams();

  //   const article_id = useMemo(() => {
  //     return article;
  //   }, [article]);

  console.log("render-image");
  useEffect(() => {
    dispatch(resetImages());
    dispatch(showImagesArticle({ id: decrypt(article) }));
  }, [dispatch, article]);

  return (
    <div className="show-image-article">
      <TableContainer
        url_create_btn={`/admin/article/new/image/${article}`}
        title="Iamges"
        data={globalState.article.images}
      >
        <TableListImage></TableListImage>
      </TableContainer>
    </div>
  );
};

export default ShowIamgeArticle;
