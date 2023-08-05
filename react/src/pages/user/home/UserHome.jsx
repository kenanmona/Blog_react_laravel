import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import UserPostContainer from "../../../components/user/home/userpostcontainer/UserPostContainer";
import UserPost from "../../../components/user/home/userposts/UserPost";
import { request } from "../../../services/utils/axios-utils";
import { loading } from "../../../store/user/loaderSlice";
import "./userhome.scss";
const UserHome = () => {
  const dispatch = useDispatch();

  const { data } = useQuery(
    "article",
    async () => {
      dispatch(loading("start"));
      const res = await request({ url: "/category/article/show" });
      dispatch(loading("end"));
      return res;
    },
    {
      // staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
    }
  );
  return (
    <>
      <title>KGS | Home</title>
      <div className="user-home">
        {data?.data?.data.map((item, index) => (
          <UserPostContainer
            key={index}
            data={item.article}
            category={{ name: item.name, id: item.id }}
          >
            <UserPost />
          </UserPostContainer>
        ))}
      </div>
    </>
  );
};

export default UserHome;
