import React from "react";

const AddPerson = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.fill || "#fff"}
        d="M8.23 5.91A3.09 3.09 0 1111.32 9a3.09 3.09 0 01-3.09-3.09zm3.09 4.64c-2.06 0-6.19 1-6.19 3.09v1.55H17.5v-1.55c0-2.06-4.12-3.09-6.18-3.09zm-4.64-3.1H4.36V5.13H2.81v2.32H.5V9h2.31v2.32h1.55V9h2.32z"
      />
    </svg>
  );
};

export default AddPerson;
