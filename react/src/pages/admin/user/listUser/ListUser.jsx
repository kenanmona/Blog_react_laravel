import React, { useEffect } from "react";
import "../../user/listUser/listUser.scss";

import TableContainer from "../../../../components/admin/table/tablecontainer/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { showAllUsers } from "../../../../store/admin/userSlice";
import TableListUser from "../../../../components/admin/table/tablelistuser/TableListUser";
const ListUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showAllUsers());
  }, [dispatch]);

  const data = useSelector((state) => state);
  return (
    <div className="list-user">
      <TableContainer title="Users" data={data.user.users}>
        <TableListUser></TableListUser>
      </TableContainer>
    </div>
  );
};

export default ListUser;

/* import React from "react";
import TableContainer from "../../../../components/admin/table/tablecontainer/TableContainer";
import "./listUser.scss";
import useData from "../../../../services/hooks/useData";
import TableListUser from "../../../../components/admin/table/tablelistuser/TableListUser";
import Button from "../../../../components/admin/table/buttontable/Button";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
const ListUesr = () => {
  const data = useData();
  return (
    <div className="list-user">
      <TableContainer title="Users" data={data}>
        <TableListUser>
          <Button backgroundColor="#3fee0096">
            <BorderColorIcon className="icon-without-animation" />
          </Button>
          <Button backgroundColor="#f019196e">
            <DeleteOutlineIcon className="icon-without-animation" />
          </Button>
        </TableListUser>
      </TableContainer>
    </div>
  );
};

export default ListUesr;
 */
