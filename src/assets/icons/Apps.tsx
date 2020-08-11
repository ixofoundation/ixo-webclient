import React from "react";

const Apps = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path
        fill="#e4bc3d"
        d="M5.12 8.99L1.36 12.9l.01 4.08 3.87-.02 3.75-3.91-3.87-4.06z"
      />
      <path
        fill="#79af50"
        d="M16.6 1.02l-3.86.03L9 4.94 12.88 9l3.75-3.91-.03-4.07z"
      />
      <path
        fill="#ad245c"
        d="M16.64 12.94L12.88 9l-3.89 4.05 3.77 3.94 3.89-.01-.01-4.04z"
      />
      <path
        fill="#f3815c"
        d="M5.24 1.01l-3.89.01h-.01l.01 4.04 3.77 3.93L9 4.94 5.24 1.01z"
      />
      <path fill="#00c6ff" d="M9 4.94L5.12 8.99l3.87 4.06L12.88 9 9 4.94z" />
    </svg>
  );
};

export default Apps;
