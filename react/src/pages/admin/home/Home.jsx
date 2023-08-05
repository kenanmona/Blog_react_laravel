import React from "react";
import { useQuery } from "react-query";
// import Chart from "../../../components/admin/home/chart/Chart";
// import Featured from "../../../components/admin/home/featured/Featured";
import Widget from "../../../components/admin/home/widget/Widget";
// import TableList from '../../../components/admin/home/table/TableList';

import "./home.scss";
import { request } from "../../../services/utils/axios-utils";

const Home = () => {
    const { data: users } = useQuery("users", () => {
        return request({ url: "count-users" });
    });
    const { data: likes } = useQuery("likes", () => {
        return request({ url: "count-likes" });
    });
    const { data: comments } = useQuery("comments", () => {
        return request({ url: "count-comments" });
    });
    const { data: articles } = useQuery("articles", () => {
        return request({ url: "count-articles" });
    });
    /* console.log("users", users?.data?.length);
    console.log("likes", likes?.data?.length);
    console.log("comments", comments?.data?.length);
    console.log("articles", articles?.data?.length);
    console.log("======================"); */

    return (
        <div className="home">
            <div className="widgets">
                <Widget type="users" data={users?.data?.length} />
                <Widget type="article" data={articles?.data?.length} />
            </div>
            <div className="widgets">
                <Widget type="likes" data={likes?.data?.length} />
                <Widget type="comments" data={comments?.data?.length} />
            </div>
            {/* <div className='charts'>
        <Featured/>
        <Chart/>
      </div> */}
            {/* <div className='list-container'>
        <div className='list-title'> Latest Transaction</div>
        <TableList/>



      </div> */}
        </div>
    );
};

export default Home;
