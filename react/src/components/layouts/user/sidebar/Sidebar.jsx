import React from "react";
import "./sidebar.scss";
import SidebarContainer from "./sidebarContainer/SidebarContainer";
import SidebarPost from "./sidebarPosts/SidebarPost";
import TagSidebar from "./tagsidebar/TagSidebar";
import { useQuery } from "react-query";
import { request } from "../../../../services/utils/axios-utils";
const Sidebar = () => {
  // const [data, setData] = useState([]);
  // const onSuccess = (result) => {
  //   console.log(result);
  //   setData((prev) => {
  //     return (prev = result.data.data);
  //   });
  // };

  const { data: tag } = useQuery(
    "tag-user",
    async () => {
      return await request({ url: "/user/tag/show" });
    },
    {
      staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const { data: popular } = useQuery(
    "popular-user",
    async () => {
      return await request({ url: "/popular/article/show" });
    },
    {
      staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  return (
    <div className="sidebar-user">
      <h3>Popular Posts</h3>
      <SidebarContainer data={popular?.data.data ? popular?.data.data : []}>
        <SidebarPost />
      </SidebarContainer>

      <h3>Tags</h3>
      <SidebarContainer data={tag?.data.data ? tag?.data.data : []}>
        <TagSidebar />
      </SidebarContainer>
    </div>
  );
};

export default Sidebar;
