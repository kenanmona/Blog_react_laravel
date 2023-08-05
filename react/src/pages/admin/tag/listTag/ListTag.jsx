import React, { useEffect } from "react";
import "../../category/listCategory/listCategory.scss";

import TableContainer from "../../../../components/admin/table/tablecontainer/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { showTag } from "../../../../store/admin/tagSlice";
import TableListTag from "../../../../components/admin/table/tableListTag/TableListTag";

const ListTag = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showTag());
  }, [dispatch]);

  const data = useSelector((state) => state);

  return (
    <div className="list-category">
      <TableContainer title="Tags" data={data.tag.tags}>
        <TableListTag></TableListTag>
      </TableContainer>
    </div>
  );
};

export default ListTag;
