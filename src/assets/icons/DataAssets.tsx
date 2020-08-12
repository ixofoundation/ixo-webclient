import React from "react";
const DataAssets = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 36}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path
        fill={props.fill || "#fff"}
        d="M13.71,6.12,9.13,3.47V.62l7,4.08Zm-.13.24L9,3.71,4.42,6.36v5.28L9,14.29l4.58-2.65ZM8.87,3.47V.62L1.81,4.7,4.29,6.12ZM4.16,6.36,1.68,4.92v8.16l2.48-1.44ZM1.81,13.3l7.06,4.08V14.53L4.29,11.88Zm7.32,1.23v2.85l7-4.08-2.47-1.42Zm4.71-8.17v5.28l2.48,1.44V4.92Z"
      />
    </svg>
  );
};
export default DataAssets;
