import React, { useEffect, useMemo } from "react";
import "./listCategory.scss";

import TableContainer from "../../../../components/admin/table/tablecontainer/TableContainer";
import TableListCategory from "../../../../components/admin/table/tableListCategory/TableListCategory";
import { useDispatch, useSelector } from "react-redux";
import { ShowCategory } from "../../../../store/admin/categorySlice";

const ListCategory = () => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);

  const categories = useMemo(() => {
    return globalState.category.categories;
  }, [globalState.category.categories]);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(ShowCategory());
    }
  }, [dispatch, categories]);

  return (
    <div className="list-category">
      <TableContainer title="Category" data={globalState.category.categories}>
        <TableListCategory></TableListCategory>
      </TableContainer>
    </div>
  );
};

export default ListCategory;
