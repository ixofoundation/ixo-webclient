import React from 'react';

const Investments = (props: any): JSX.Element => {
  return (
    <svg
      width={props.width || 36}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path
        d="M9,.62,1.75,4.81v8.38L9,17.38l7.25-4.19V4.81Zm5.34,11.46L9,15.17,3.66,12.08V5.92L9,2.83l5.34,3.09ZM4,8.06H14v3.77l-5,3-5-3Z"
        fill={props.fill || '#fff'}
      />
    </svg>
  );
};

export default Investments;
