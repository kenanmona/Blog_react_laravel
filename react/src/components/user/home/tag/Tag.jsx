import React from "react";
import "./tag.scss";
const Tag = ({ data }) => {
  return (
    <div className="tag-container">
      {data?.map((tag, index) => {
        return (
          <div key={index} className={`article-tag`}>
            {tag}
          </div>
        );
      })}
    </div>
  );
};

export default Tag;
