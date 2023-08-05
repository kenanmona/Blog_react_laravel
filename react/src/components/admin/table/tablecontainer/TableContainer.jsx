import React from "react";
import "./tablecontainer.scss";
import Button from "../buttontable/Button";
import CreateIcon from "@mui/icons-material/Create";
import { useNavigate } from "react-router";
import { useQuery } from "react-query";
import { request } from "../../../../services/utils/axios-utils";

const TableContainer = ({ data, children, title, url_create_btn }) => {
    const push = useNavigate();

    /* const elementchildren = children.props.children; */
    const tableList = React.cloneElement(
        children,
        {
            data,
        }
        /* elementchildren */
    );
    const crudButton = (url) => {
        if (url) {
            push(url);
        } else {
            push("new");
        }
    };
    return (
        <div className="tableContainer">
            <div className="top">
                <h3>{title}</h3>
                <Button crudButton={() => crudButton(url_create_btn)}>
                    <CreateIcon className="icon-with-animation" />
                </Button>
            </div>
            {/* table list */}
            {tableList}
        </div>
    );
};

export default TableContainer;
