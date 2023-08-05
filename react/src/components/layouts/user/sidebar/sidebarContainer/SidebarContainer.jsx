import React from "react";

const SidebarContainer = ({ children, data }) => {
  const cloneElement = data.map((el) =>
    React.cloneElement(children, {
      data: el,
      key: el.id,
    })
  );
  return <div>{cloneElement}</div>;
};

export default SidebarContainer;
