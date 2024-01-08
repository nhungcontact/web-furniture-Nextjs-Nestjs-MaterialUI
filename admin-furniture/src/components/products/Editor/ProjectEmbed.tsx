import React from "react";

export const ProjectEmbed = (props) => {
  const { attributes, children, element } = props;
  return (
    <>
      <div {...attributes}>
        <div contentEditable={false}>Project!</div>
        {children}
      </div>
    </>
  );
};
