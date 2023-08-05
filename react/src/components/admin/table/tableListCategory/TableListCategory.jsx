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
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { DeleteCategory } from "../../../../store/admin/categorySlice";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import encrypt from "../../../../services/crypto/encrypt";

const TableListCategory = ({ data }) => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  const navigate = useNavigate();
  // console.log(encrypt("1982"));
  // console.log(decrypt(encrypt("1982")));
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="head-table">
          <TableRow>
            <TableCell className="tableCell">Category</TableCell>

            <TableCell className="tableCell"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">
                  <div className="button-settings">
                    <Button
                      crudButton={() => {
                        const idEncrypt = encrypt(row.id.toString());
                        navigate(`update/${idEncrypt}`);
                      }}
                      load={false}
                      backgroundColor="#3fee0096"
                    >
                      <BorderColorIcon className="icon-without-animation" />
                    </Button>
                    <Button
                      load={
                        globalState.category.id === row.id &&
                        globalState.category.loader
                      }
                      crudButton={() =>
                        dispatch(DeleteCategory({ id: row.id }))
                      }
                      backgroundColor="#f019196e"
                    >
                      <DeleteOutlineIcon className="icon-without-animation" />
                    </Button>
                    <ToastContainer />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableListCategory;
