import React from "react";
import "./tablelistuser.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "../buttontable/Button";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import BlockIcon from "@mui/icons-material/Block";
import CachedIcon from "@mui/icons-material/Cached";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUser,
  removeRoleUser,
  unBlockUser,
  updateRoleUser,
} from "../../../../store/admin/userSlice";
import { ToastContainer } from "react-toastify";

const TableListUser = ({ data }) => {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="head-table">
          <TableRow>
            <TableCell className="tableCell">id</TableCell>
            <TableCell className="tableCell">name</TableCell>
            <TableCell className="tableCell">email</TableCell>
            <TableCell className="tableCell"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">{row.email}</TableCell>
                <TableCell className="tableCell">
                  <div className="button-settings">
                    {row.roles.length === 1 && (
                      <Button
                        load={
                          globalState.user.id === row.id &&
                          globalState.user.loaderAdmin
                        }
                        crudButton={() => {
                          dispatch(updateRoleUser({ id: row.id }));
                        }}
                        backgroundColor="#3fee0096"
                      >
                        <ArrowCircleUpIcon className="icon-without-animation" />
                      </Button>
                    )}
                    {row.roles.length === 2 && (
                      <Button
                        crudButton={() => {
                          dispatch(removeRoleUser({ id: row.id }));
                        }}
                        load={
                          globalState.user.id === row.id &&
                          globalState.user.loaderUser
                        }
                        backgroundColor="#f019196e"
                      >
                        <ArrowCircleDownIcon className="icon-without-animation" />
                      </Button>
                    )}
                    {row.Block && (
                      <Button
                        crudButton={() => {
                          dispatch(unBlockUser({ id: row.id }));
                        }}
                        load={
                          globalState.user.id === row.id &&
                          globalState.user.loaderUnBlock
                        }
                        backgroundColor="#3fee0096"
                      >
                        <CachedIcon className="icon-without-animation" />
                      </Button>
                    )}
                    {!row.Block && (
                      <Button
                        crudButton={() => {
                          dispatch(blockUser({ id: row.id }));
                        }}
                        load={
                          globalState.user.id === row.id &&
                          globalState.user.loaderBlock
                        }
                        backgroundColor="#f019196e"
                      >
                        <BlockIcon className="icon-without-animation" />
                      </Button>
                    )}
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

export default TableListUser;
