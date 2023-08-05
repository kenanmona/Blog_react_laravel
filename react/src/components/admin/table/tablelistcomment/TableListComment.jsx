import React from "react";
import "../tablelistuser/tablelistuser.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "../buttontable/Button";
// import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import encrypt from "../../../../services/crypto/encrypt";
// import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../../store/admin/commentSlice";
import { ToastContainer } from "react-toastify";

const TableListComment = ({ data }) => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  //   const navigate = useNavigate();

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="head-table">
          <TableRow>
            <TableCell className="tableCell">Comment</TableCell>
            <TableCell className="tableCell"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.content}</TableCell>
              <TableCell className="tableCell">
                <div className="button-settings">
                  <Button
                    load={
                      globalState.comment.id === row.id &&
                      globalState.comment.loader
                    }
                    crudButton={() => dispatch(deleteComment({ id: row.id }))}
                    backgroundColor="#f019196e"
                  >
                    <DeleteOutlineIcon className="icon-without-animation" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ToastContainer />
    </TableContainer>
  );
};

export default TableListComment;
