import React from 'react';

const Star = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 18}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={props.fill || '#fff'}
        d="M17.61 7.08l-6.19-.52L9 .91 6.58 6.56l-6.19.52 4.7 4.02-1.41 5.99L9 13.91l5.32 3.18-1.41-5.99 4.7-4.02z"
      />
    </svg>
  );
};

export default Star;
