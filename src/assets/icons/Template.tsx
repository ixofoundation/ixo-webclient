import React from "react";

const Template = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 36}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.07,6.48V3.74L7.66.62,2.26,3.74V10l2.67,1.54v2.74l5.41,3.12,5.4-3.12V8ZM4,9V4.74L7.66,2.62l3.67,2.12v.74l-1-.58L4.93,8v1.5Z"
        fill={props.fill || "#fff"}
      />
    </svg>
  );
};

export default Template;
