import React from "react";
const Cells = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 36}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path
        fill={props.fill || "#fff"}
        d="M5.5,10.51,3,12,.41,10.51v-3L3,6,5.5,7.5ZM3.43,12.86v3L6,17.38l2.54-1.51v-3L6,11.36ZM14.57,5.14v-3L12,.62,9.48,2.13v3L12,6.64Zm-3,2.36L9,6,6.45,7.5v3L9,12l2.55-1.5Zm-3-2.36v-3L6,.62,3.43,2.13v3L6,6.64ZM15.05,6,12.5,7.5v3L15.05,12l2.54-1.5v-3ZM9.48,12.86v3L12,17.38l2.55-1.51v-3L12,11.36Z"
      />
    </svg>
  );
};
export default Cells;
