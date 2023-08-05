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
import encrypt from "../../../../services/crypto/encrypt";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { deleteArticle } from "../../../../store/admin/articleSlice";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { request } from "../../../../services/utils/axios-utils";
import { useQuery } from "react-query";
const TableListArticle = ({ data }) => {
    const dispatch = useDispatch();
    const globalState = useSelector((state) => state);
    const navigate = useNavigate();

    const { data: likes } = useQuery("likes", () => {
        return request({ url: "/likes-article" });
    });

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead className="head-table">
                    <TableRow>
                        <TableCell className="tableCell">Title</TableCell>
                        {/* <TableCell className="tableCell">Description</TableCell> */}
                        {/* <TableCell className="tableCell">Category</TableCell> */}
                        <TableCell className="tableCell">Tag</TableCell>
                        <TableCell className="tableCell">Likes</TableCell>
                        <TableCell className="tableCell">User Name</TableCell>

                        <TableCell className="tableCell"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell className="tableCell">
                                {row.id} {row.title}
                            </TableCell>
                            {/* <TableCell className="tableCell">
                <span dangerouslySetInnerHTML={{ __html: row.description }} />
              </TableCell> */}
                            {/* <TableCell className="tableCell">Category</TableCell> */}
                            <TableCell className="tableCell">
                                {row.tag.map((tag, index) => (
                                    <span key={index}>{tag}</span>
                                ))}
                            </TableCell>
                            <TableCell className="tableCell">
                                {likes?.data[index]?.length}
                            </TableCell>
                            <TableCell className="tableCell">
                                {row.user.name}
                            </TableCell>
                            <TableCell className="tableCell">
                                <div className="button-settings">
                                    <Button
                                        crudButton={() => {
                                            const idEncrypt = encrypt(
                                                row.id.toString()
                                            );
                                            navigate(`update/${idEncrypt}`);
                                        }}
                                        load={false}
                                        backgroundColor="#3fee0096"
                                    >
                                        <BorderColorIcon className="icon-without-animation" />
                                    </Button>
                                    <Button
                                        load={
                                            globalState.article.id === row.id &&
                                            globalState.article.loader
                                        }
                                        crudButton={() =>
                                            dispatch(
                                                deleteArticle({ id: row.id })
                                            )
                                        }
                                        backgroundColor="#f019196e"
                                    >
                                        <DeleteOutlineIcon className="icon-without-animation" />
                                    </Button>
                                    <Button
                                        load={false}
                                        crudButton={() => {
                                            const idEncrypt = encrypt(
                                                row.id.toString()
                                            );
                                            navigate(`show/image/${idEncrypt}`);
                                        }}
                                        backgroundColor="rgba(224, 228, 10, 0.849)"
                                    >
                                        <BurstModeIcon className="icon-without-animation" />
                                    </Button>
                                    <Button
                                        load={false}
                                        crudButton={() => {
                                            const idEncrypt = encrypt(
                                                row.id.toString()
                                            );
                                            navigate(
                                                `show/comment/${idEncrypt}`
                                            );
                                        }}
                                        backgroundColor="rgba(27, 194, 245, 0.836)"
                                    >
                                        <SpeakerNotesIcon className="icon-without-animation" />
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

export default TableListArticle;
