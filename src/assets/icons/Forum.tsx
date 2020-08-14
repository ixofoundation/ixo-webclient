import React from "react";

const Forum = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.fill || "#fff"}
        d="M16.08 3.5v11h1.57v-11zm-3.15 11h1.57v-11h-1.57zm-2.36-11H1.14a.79.79 0 00-.79.78v9.44a.79.79 0 00.79.78h9.43a.79.79 0 00.79-.78V4.28a.79.79 0 00-.79-.78zM5.86 5.66a1.77 1.77 0 11-1.77 1.77 1.76 1.76 0 011.77-1.77zm3.53 7.27H2.32v-.59c0-1.18 2.36-1.77 3.54-1.77s3.53.59 3.53 1.77z"
      />
    </svg>
  );
};

export default Forum;
