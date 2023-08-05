import React, { useEffect } from "react";
import "./showcomment.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import TableContainer from "../../../../components/admin/table/tablecontainer/TableContainer";
import TableListComment from "../../../../components/admin/table/tablelistcomment/TableListComment";
import decrypt from "../../../../services/crypto/decrypt";
import {
  resetComment,
  showComment,
} from "../../../../store/admin/commentSlice";
const ShowComment = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const { article } = useParams();

  useEffect(() => {
    dispatch(resetComment());
    dispatch(showComment({ id: decrypt(article) }));
  }, [dispatch, article]);

  return (
    <div className="show-comment">
      <TableContainer title="Comments" data={globalState.comment.comments}>
        <TableListComment></TableListComment>
      </TableContainer>
    </div>
  );
};

export default ShowComment;
